import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  // token will be accessed from cookie ...
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No access token provided" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_ENC)
    req.user = decoded.id;
    next();
  }
  catch (error) {
    return res.status(403).json({ error: "Access token is invalid" });
  }
};
