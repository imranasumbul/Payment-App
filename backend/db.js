const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://imranasumbul1211:xUGgJPYeQovNrJTQ@cluster0.w8q5ar7.mongodb.net/");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 4,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 20
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
    
});

const user = mongoose.model("Usersssss", userSchema);

module.exports = user;
