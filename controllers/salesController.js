const Sale = require("../models/Sale");

// Add Sale
exports.addSale = async (req, res) => {
  const { agent, amount, deals } = req.body;

  if (!agent || !amount || !deals) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sale = await Sale.create({ agent, amount, deals });
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
};
