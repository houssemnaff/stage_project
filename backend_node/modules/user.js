const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    fullname: {
        type: String
    },
    role: {
        type: String,
        default:'client'
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    lieu:{
        type:String
    }

});

const users = mongoose.model('users', userschema);
module.exports = users;
