const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Firestore Collections
const collections = {
  fortunes: db.collection("fortunes"),
  users: db.collection("users"),
  votes: db.collection("votes"),
  streaks: db.collection("streaks"), 
};

module.exports = { admin, db, collections };
