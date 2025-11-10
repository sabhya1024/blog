import express from "express";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import helmet from "helmet";
import argon2, { argon2id, hash } from "argon2";
import cors from "cors";

// import rateLimit from "express-rate-limit"
import CONNECT_DB from "./src/config/db.js";

// schema here >>
import User from "./src/Schema/User.js";
import Blog from "./src/Schema/Blog.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
// app.use();

let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

const verifyCaptcha = async (token) => {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.VITE_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();
  return data.success;
};

const formatDataToSend = (user) => {
  const access_token = jsonwebtoken.sign(
    {
      id: user._id,
    },
    process.env.JWT_ENC,
    { expiresIn: "15m" }
  );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameNotUnique = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUsernameNotUnique ? (username += nanoid().substring(0, 8)) : "";

  return username;
};

app.post("/signup", async (req, res) => {
  try {
    let { fullname, email, password, token } = req.body;

    const isHuman = await verifyCaptcha(token);
    if (!isHuman) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    // validate the data
    if (fullname.length < 3) {
      return res
        .status(403)
        .json({ error: "Full Name must be atleast 3 letters long" });
    }

    if (!email.length) {
      return res.status(403).json({ error: "Email can't be empty. " });
    }

    if (!emailRegex.test(email)) {
      return res.status(403).json({ error: "Enter a valid email. " });
    }

    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error:
          "Password must contain: uppercase, lowercase, number, special character (8-20 chars)",
      });
    }

    const emailExists = await User.exists({ "personal_info.email": email });
    if (emailExists) {
      return res.status(400).json({error: "Email already exists. "})
    }

    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64MB
      timeCost: 3, // number of iterations
      parallelism: 1, // threads
    });

    let username = await generateUsername(email);

    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashedPassword,
        username,
      },
    });

    try {
      const savedUser = await user.save();
      return res.status(200).json(formatDataToSend(savedUser));
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Can't connect to server" });
    }
  } catch (error) {
    // console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    let { email, password, token } = req.body;
    const isHuman = await verifyCaptcha(token);
    if (!isHuman) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }
    const user = await User.findOne({ "personal_info.email": email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValidPassword = await argon2.verify(
      user.personal_info.password,
      password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json(formatDataToSend(user));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
CONNECT_DB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});
