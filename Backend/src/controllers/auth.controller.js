import User from "../Schema/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { getAuth } from "firebase-admin/auth";
import validator from 'validator';

import { generateTokenAndSetCookie } from "../utils/generateToken.js"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

const formatDataToSend = (user) => {
  return {
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  });
  isUsernameNotUnique ? (username += nanoid().substring(0, 8)) : "";
  return username;
};


export const signup = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    email = email.trim().toLowerCase();
    fullname = validator.escape(fullname.trim());

    if (fullname.length < 3) {
      return res
        .status(403)
        .json({ error: "Full Name must be atleast 3 letters long" });
    }

    if (!email || !emailRegex.test(email) ) {
      return res.status(403).json({ error: "Enter a valid email." });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(403)
        .json({
          error:
            "Password must contain uppercase, lowercase, number, special char (8-20 chars)",
        });
    }
    //if already registered
    const emailExists = await User.exists({ "personal_info.email": email });
    if (emailExists)
      return res.status(400).json({ error: "Unable to create account. Try a different email." });


    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 3,
      parallelism: 1,
    });

    let username = await generateUsername(email);

    let user = new User({
      personal_info: { fullname, email, password: hashedPassword, username },
      googleAuth: false,
    });

    const savedUser = await user.save();
    generateTokenAndSetCookie(savedUser._id, res);
    return res.status(200).json(formatDataToSend(savedUser));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await User.findOne({ "personal_info.email": email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.personal_info.password) {
         return res.status(403).json({ 
             error: "Account was created with Google. Please sign in with Google." 
         });
    }

    const isValidPassword = await argon2.verify(
      user.personal_info.password,
      password
    );

    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid email or password" });

    generateTokenAndSetCookie(user._id, res);

    return res.json(formatDataToSend(user));
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    let { access_token } = req.body;
    const decodedUser = await getAuth().verifyIdToken(access_token);
    let { email, name, picture } = decodedUser;
    email = email.toLowerCase();
  

    let user = await User.findOne({ "personal_info.email": email }).select(
      "personal_info.fullname personal_info.username personal_info.profile_img googleAuth -password"
    );

    if (user) {
      if (!user.googleAuth) {
        user.googleAuth = true;
        await user.save();
      }
    } else {
      let username = await generateUsername(email);
      user = new User({
        personal_info: {
          fullname: name,
          email,
          profile_img: picture,
          username,
        },
        googleAuth: true,
      });
      await user.save();
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json(formatDataToSend(user));
  } catch (error) {
    return res.status(500).json({ error: "Google Auth failure" });
  }
};
