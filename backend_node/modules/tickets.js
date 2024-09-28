const mongoose = require('mongoose');
//const Comment = require('./comments');

const ticket = mongoose.model('ticket',{
    title:{
        type : String
    },
    userid:{
        type:String
    },
    description:{
        type : String
    },
    status: {
        type : String
    },
    priority: {
        type : String
    },
    creatAt:{
        type:Date,
        default:Date.now()
    },
    comments: [{
       
        text: {
            type: String
        },
        user:{
            type:String
        },
        admin:{
            type:String
        },
        creatAt:{
            type:Date
        }
    }]

})
module.exports = ticket;