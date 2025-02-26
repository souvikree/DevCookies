const { collections } = require("../config/firebase");

const getRandomQuote = async (category) => {
  let query = collections.fortunes;
  if (category) query = query.where("category", "==", category);

  const snapshot = await query.get();
  if (snapshot.empty) return null;

  const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
  return { id: snapshot.docs[randomIndex].id, ...snapshot.docs[randomIndex].data() };
};

const addQuote = async (quote) => {
  const newQuoteRef = collections.fortunes.doc();
  await newQuoteRef.set({ ...quote, votes: 0, createdAt: new Date() });
  return { id: newQuoteRef.id, ...quote };
};
// 4️⃣ Save favorite fortune
const saveFavoriteQuote = async (userId, quoteId) => {
    const userRef = collections.users.doc(userId);
    await userRef.update({
      favorites: admin.firestore.FieldValue.arrayUnion(quoteId),
    });
  };

// 4️⃣ Get user favorites
const getUserFavorites = async (userId) => {
    const user = await collections.users.doc(userId).get();
    return user.exists ? user.data().favorites || [] : [];
  };  

const voteQuote = async (quoteId, voteType) => {
  const quoteRef = collections.fortunes.doc(quoteId);
  const quote = await quoteRef.get();
  if (!quote.exists) return null;

  const newVotes = voteType === "upvote" ? quote.data().votes + 1 : quote.data().votes - 1;
  await quoteRef.update({ votes: newVotes });

  return { id: quoteId, ...quote.data(), votes: newVotes };
};

const getTopVotedQuotes = async (limit) => {
  const snapshot = await collections.fortunes.orderBy("votes", "desc").limit(limit).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const triggerEasterEgg = async () => {
    const easterEggs = [
      { text: "404 Wisdom Not Found", category: "Easter Egg", votes: 999 },
      { text: "You have unlocked Senior Dev status!", category: "Easter Egg", votes: 888 },
    ];
    return easterEggs[Math.floor(Math.random() * easterEggs.length)];
  };

module.exports = { getRandomQuote, addQuote, voteQuote, getTopVotedQuotes, triggerEasterEgg, getUserFavorites, saveFavoriteQuote };
