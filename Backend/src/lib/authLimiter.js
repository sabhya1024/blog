import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 7,
    message: {
        error: "Too are out of attempts. You are locked out for 1 hour. Please try again after 1 hour."
    },
    standardHeaders: true,
    legacyHeaders: false,
})