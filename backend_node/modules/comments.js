const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    
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
        type:Date,
        default:Date.now()
    }
});

const comment = mongoose.model('Comments', commentSchema);
module.exports = comment;
