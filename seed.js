const mongoose = require('mongoose');
const Agent = require('./models/Sale'); // your Mongoose model

const data = [
  { agent: "Alice", amount: 1200, deals: 30},
  { agent: "Bibek", amount: 5000, deals: 20},
  { agent: "Dipsa", amount: 4000, deals: 40}
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Agent.deleteMany({});
  await Agent.insertMany(data);
  console.log("Data seeded");
  mongoose.connection.close();
};

seedDB();
