const { getRandomQuote, addQuote, voteQuote, getTopVotedQuotes, triggerEasterEgg, getUserFavorites, saveFavoriteQuote } = require("../services/quoteService");

const fetchRandomQuote = async (req, res) => {
    try {
      const { category } = req.query;
      const quote = await getRandomQuote(category);
      if (Math.random() < 0.01) {
        quote = await triggerEasterEgg();
      }
      res.json({ success: true, quote });
    } catch (error) {
      res.status(500).json({ message: "Error fetching quote" });
    }
  };

  // 4️⃣ Save a quote as a user's favorite
const saveFavorite = async (req, res) => {
    try {
      const { userId, quoteId } = req.body;
      await saveFavoriteQuote(userId, quoteId);
      res.json({ success: true, message: "Quote saved as favorite" });
    } catch (error) {
      res.status(500).json({ message: "Error saving favorite" });
    }
  };

  const getFavorites = async (req, res) => {
    try {
      const { userId } = req.query;
      const favorites = await getUserFavorites(userId);
      res.json({ success: true, favorites });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving favorites" });
    }
  };
  
  const createQuote = async (req, res) => {
    try {
      const { text, category } = req.body;
      if (!text || !category) return res.status(400).json({ message: "Missing fields" });
  
      const newQuote = await addQuote({ text, category });
      res.status(201).json({ success: true, newQuote });
    } catch (error) {
      res.status(500).json({ message: "Error adding quote" });
    }
  };
  
  const updateVote = async (req, res) => {
    try {
      const { quoteId } = req.params;
      const { voteType } = req.body;
  
      if (!["upvote", "downvote"].includes(voteType)) {
        return res.status(400).json({ message: "Invalid vote type" });
      }
  
      const updatedQuote = await voteQuote(quoteId, voteType);
      if (!updatedQuote) return res.status(404).json({ message: "Quote not found" });
  
      res.json({ success: true, updatedQuote });
    } catch (error) {
      res.status(500).json({ message: "Error updating vote" });
    }
  };
  

const fetchTopVotedQuotes = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const topQuotes = await getTopVotedQuotes(parseInt(limit, 10));
    res.json({ success: true, topQuotes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching top quotes" });
  }
};

module.exports = { fetchRandomQuote, createQuote, updateVote, fetchTopVotedQuotes, saveFavorite, getFavorites };
