const Sale = require("../models/Sale");

// Add Sale
exports.addSale = async (req, res) => {
  const { agent, amount, deals } = req.body;

  if (!agent || !amount || !deals) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sale = await Sale.create({ agent, amount, deals });
  // If the request came from a browser form, redirect back to the leaderboard view
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.redirect('/sales/leaderboard/view');
  }
  res.status(201).json(sale);
};

// Leaderboard
exports.getLeaderboard = async (req, res) => {
  const leaderboard = await Sale.aggregate([
    {
      $group: {
        _id: "$agent",
        totalSales: { $sum: "$amount" },
        totalDeals: { $sum: "$deals" }
      }
    },
    {
      $sort: { totalSales: -1, totalDeals: -1 }
    }
  ]);

  const ranked = leaderboard.map((item, index) => ({
    rank: index + 1,
    agent: item._id,
    totalSales: item.totalSales,
    totalDeals: item.totalDeals
  }));

  res.json(ranked);
};

// View Leaderboard
exports.viewLeaderboard = async (req, res) => {
  try {
    const data = await Sale.aggregate([
      {
        $group: {
          _id: "$agent",
          totalSales: { $sum: "$amount" },
          totalDeals: { $sum: "$deals" }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.render("leaderboard", {
      leaderboard: data.map((d, i) => ({
        rank: i + 1,
        agent: d._id,
        totalSales: d.totalSales,
        totalDeals: d.totalDeals
      }))
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
  }
};
