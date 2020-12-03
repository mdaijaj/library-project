 
const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');

const userSchema = mongoose.Schema({
    firstname: {
        type: String, 
        require:true,
        trim: true,
        min: 3,
        max: 20 
    },
    lastname: {
        type: String, 
        require:true,
        trim: true,
        min: 3,
        max: 20 
    },  
    email: {
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        require:true,
    },
    roll: {
        type: String,
        enum: ['admin', 'resailer', 'user'],
        default: "user"
    },
    contact_no: {
        type: String
    },
    profile_pic:{
        type: String
    }
  }, {timestamps: true});     
  
module.exports= mongoose.model('User', userSchema);