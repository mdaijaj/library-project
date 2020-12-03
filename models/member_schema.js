 
const mongoose=require('mongoose');
// const bcrypt=require('bcrypt');

const memberSchema = mongoose.Schema({
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
    description: {
        type: String, 
        require:true,
        trim: true,
    },
    father_name: {
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
    password: {
        type: String,
        require:true,
    },
    address: {
        type:String
    },
    city: {
        type:String
    },
    state: {
        type:String
    },
    dob: {
        type:String,
    },
    age: {
        type: Number
    },
    sex: {
        type: String,
        enum: ['male', 'female', 'others'],
        default: "male"
    },
    category: {
        type:String,
        enum: ['housewife', 'student', 'gove service', 'private service'],
        default: "student"
    },
    memberType: {
        type: String,
        enum: ['child', 'adult'],
        default: "adult"
    },
    adhar_no: {
        type: Number,
        unique: true,

    },
    contact_no: {
        type: Number
    },
    image:{
        type: String
    }
  }, {timestamps: true});     
  
module.exports= mongoose.model('Member', memberSchema);