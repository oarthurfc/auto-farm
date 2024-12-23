const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    username : { 
        type: String,
        required: false
    },
    roles : {
        User :{
            type: Number,
            default : 2001},
        Admin : Number,

        
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : String
})

module.exports = mongoose.model('User',userSchema);