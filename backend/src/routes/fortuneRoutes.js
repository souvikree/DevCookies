const express = require("express");
const { fetchRandomQuote, createQuote, updateVote, fetchTopVotedQuotes, saveFavorite, getFavorites } = require("../controllers/fortuneController");
const authenticateUser = require("../middleware/authMiddleware");
const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.get("/", fetchRandomQuote);
router.post("/", authenticateUser, rateLimiter, createQuote);
router.post("/favorite", authenticateUser, saveFavorite);
router.get("/favorites", authenticateUser, getFavorites);
router.patch("/:quoteId/vote", authenticateUser, rateLimiter, updateVote);
router.get("/top", fetchTopVotedQuotes);

module.exports = router;
