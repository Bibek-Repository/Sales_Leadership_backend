const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse form submissions
app.set('view engine', 'ejs'); // For frontend rendering
app.set('views', './views'); // Set views directory
app.use(express.static('public')); // Serve static files

// Routes
app.use('/sales', require('./routes/salesRoutes'));

// Root route
app.get('/', (req, res) => {
    res.render('leaderboard');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
