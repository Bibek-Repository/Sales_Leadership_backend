Sales Leadership Dashboard

A web application to track and visualize sales data for agents. Built with Node.js, Express.js, and MongoDB Atlas, and deployed publicly using Render.com.

This README focuses on the project structure, backend architecture, and usage for developers.

Table of Contents

Project Structure
Technologies
Installation
Environment Variables
Server and Architecture
Routes & Controllers
Deployment
Contributinggit branch
License

Project Structure
Sales-Leadership-Dashboard/
│
├─ controllers/
│   └─ salesController.js       
│
├─ models/
│   └─ Sale.js                
│
├─ routes/
│   └─ salesRoutes.js           # API endpoints for sales
│
├─ views/
│   ├─ leaderboard.ejs                # Main dashboard view
│                
│
├─ config/
│   └─ db.js                    # MongoDB connection
│
├─ public/
│   └─ css/                     # Static files (stylesheets)
│
├─ .env                         # Environment variables
├─ server.js                     # Entry point of the application
├─ package.json                  # Project dependencies
└─ README.md                     # Project documentation

Technologies

Backend: Node.js, Express.js
Database: MongoDB Atlas, Mongoose
Frontend: EJS templates
Hosting: Render.com
Other Tools: Body-parser, CORS

Installation

Clone the repository:

git clone https://sales-leadership-backend.onrender.com/
cd Sales-Leadership-Dashboard


Install dependencies:

npm install

Start the server:

npm start
The server will run at https://sales-leadership-backend.onrender.com/

Environment Variables
Variable	Description


Server and Architecture

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", require("./routes/salesRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


MVC architecture:

Models: MongoDB schemas (models/)
Controllers: Business logic (controllers/)
Routes: API endpoints (routes/)
Views: EJS templates for frontend (views/)

Routes & Controllers
Route	Method	                            Controller Function	Description
/sales	POST	salesController.addSale	    Add a new sale
/sales	GET	salesController.getSales	    Fetch all sales
/agents	GET	salesController.getAgents	    Fetch all agents

Each route calls its corresponding controller function which interacts with the MongoDB models.

Deployment

The app is deployed on Render.com: https://sales-leadership-backend.onrender.com/

Steps to deploy:

Connect GitHub repository to Render.
Set environment variables in Render dashboard.
Deploy the service.
Contributing


Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push: git push origin feature-name

Open a Pull Request

License

MIT License.

Author:
Bibek Baiju