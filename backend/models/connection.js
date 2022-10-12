var mongoose = require("mongoose")
require('dotenv').config();

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}`, options, function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("connection OK!");
    }
});
