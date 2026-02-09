const express = require("express");
const router = express.Router();
const {
  addSale,
  getLeaderboard,
  viewLeaderboard
} = require("../controllers/salesController");

router.post("/", addSale);
router.get("/leaderboard", getLeaderboard);
router.get("/leaderboard/view", viewLeaderboard);

module.exports = router;
