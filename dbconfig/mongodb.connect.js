var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

try {
    const mongo_url = "mongodb://admin:admin@ds125628.mlab.com:25628/talent-dashboard-app" //|| "mongodb://localhost:27017/talent-dashboard-app";
    mongoose.connect(mongo_url, (error) =>{
        if(error){
            throw error;
        }else{
            console.log("Successfully connected to mongoDB :", mongo_url);
        }
    });
} catch (error) {
    console.log("Mongo Database connection failed with error: ", error);
}

module.exports = mongoose;