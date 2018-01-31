var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect("mongodb://localhost:27017/talent-dashboard-app");
try {
    const mongo_url = process.env.MONGOLAB_URI || "mongodb://localhost:27017/talent-dashboard-app";
    mongoose.connect(mongo_url);
    console.log("Successfully connected to mongoDB :", mongo_url);
} catch (error) {
    console.log("Mongo Database connection failed with error: ", error);
}

module.exports = mongoose;