const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:4,
    },
    lastName: {
        type:String,
        required:true,
        min:4,
    },
    email: {
        type:String,
        required:true,
        union:true,
        min:6
    },
    password: {
        type:String,
        required:true,
        min:6,
    
    },
});

module.exports = mongoose.model('User', userSchema);
