const mongoose=require('mongoose');

const memberBookSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    bookItems: [
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                require: true
            }
        }
    ],
    
  }, {timestamps: true});     
  
module.exports= mongoose.model('CartMember', memberBookSchema);