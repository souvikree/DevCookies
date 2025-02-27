const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests. Please try again later.",
});

module.exports = limiter;
