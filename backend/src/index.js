const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fortuneRoutes = require("./routes/fortuneRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/fortunes", fortuneRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
