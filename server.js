const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // To load MONGO_URI from .env
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define a schema for leaderboard
const saleSchema = new mongoose.Schema({
  agent: String,
  totalSales: Number,
  totalDeals: Number
});

const Sale = mongoose.model('Sale', saleSchema);

// GET / → Render leaderboard
app.get('/', async (req, res) => {
  try {
    let leaderboard = await Sale.find().sort({ totalSales: -1 }).lean(); // sort descending
    // Add rank dynamically
    leaderboard = leaderboard.map((item, index) => ({ ...item, rank: index + 1 }));
    res.render('leaderboard', { leaderboard });
  } catch (err) {
    console.error(err);
    res.send("Error fetching leaderboard");
  }
});

// POST /sales → Add or update sale
app.post('/sales', async (req, res) => {
  const { agent, amount, deals } = req.body;

  try {
    // Check if agent already exists
    let existing = await Sale.findOne({ agent });
    if (existing) {
      existing.totalSales += Number(amount);
      existing.totalDeals += Number(deals);
      await existing.save();
    } else {
      const newSale = new Sale({
        agent,
        totalSales: Number(amount),
        totalDeals: Number(deals)
      });
      await newSale.save();
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("Error saving sale");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

