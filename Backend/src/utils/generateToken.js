import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_ENC, {
    expiresIn: "15d", 
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    sameSite: "strict", // for CSRF
    secure: process.env.NODE_ENV !== "development", // HTTPS only in production
  });

  return token;
};
