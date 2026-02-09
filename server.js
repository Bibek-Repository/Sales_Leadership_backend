const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // For frontend rendering

// Root route
app.get('/', (req, res) => {
    res.send('Sales Leaderboard Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
