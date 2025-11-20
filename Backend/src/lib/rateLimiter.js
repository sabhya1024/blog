import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, 
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes",
  },
  statusCode: 429,
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
