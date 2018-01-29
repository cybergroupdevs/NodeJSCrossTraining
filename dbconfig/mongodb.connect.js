var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost:27017/talent-dashboard-app");
try {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/talent-dashboard-app");
    console.log("Successfully connected to mongoDB :", mongoose.MONGODB_URI);    
} catch (error) {
    console.log("Mongo Database connection failed with error: ", error);    
}

module.exports = mongoose;