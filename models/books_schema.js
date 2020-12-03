const mongoose=require('mongoose');

const bookSchema = mongoose.Schema({
    subject: {
        type: String, 
        require:true,
        trim: true,
        min: 3,
        max: 30 
    },
    author: {
        type: String, 
        require:true,
        trim: true,
        min: 3,
        max: 30 
    },  
    publisher: {
        type:String,
        require:true,
        trim: true,
        lowercase: true,
    },
    publish: {
        type:String,
        require:true,
        trim: true,
    },
    description: {
        type:String,
        require:true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    ISBN: {
        type: Number,
        require:true,
        trim: true,
        unique: true
    },
    language: {
        type: String,
        require:true,
    },
    productPicture: 
    [
        {img: {type: String} }
    ]
    ,
  }, {timestamps: true});     
  
module.exports= mongoose.model('Book', bookSchema);