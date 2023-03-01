const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.DB_URI,)
    .then(()=>console.log("MongoDB Connected Successfully"))
};

module.exports = connectDatabase;