const mongoose = require("mongoose");
const uid2 = require("uid2");

var articleSchema = mongoose.Schema({
    title : String,
    description : String,
    urlToImage : String,
});


var userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    articles : [articleSchema],
    token: String, 
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

