var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost:27017/talent-dashboard-app");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/talent-dashboard-app");

module.exports = { mongoose };