
// const Book= require('../models/books_schema')
const CartMember=require('../models/memberBook_schema')
// const {login_required}=require('../middleware/index')


exports.addtocart= async (req,res)=>{
    try{
        // console.log("member details:-", req.user.user_detail) //change user to members
        CartMember.findOne({memberId: req.user.user_detail._id}).exec((err, cart)=>{
            if(err){
                console.log(err)
            }

            //if card avaiable than book add or same book add and increment quantity.
            if(cart){
                const booksID=req.body.bookItems.bookId
                const isBook= cart.bookItems.find(c => c.bookId== booksID )
                
                // update book quantity or same book
                if(isBook){
                    CartMember.findOneAndUpdate({"memberId": req.user.user_detail._id, "bookItems.bookId": booksID}, {
                        "$set": {
                            "bookItems": {
                                ...req.body.bookItems,
                                quantity: isBook.quantity + req.body.bookItems.quantity
                            }
                        }
                    })
                    .exec((err, data)=>{
                        if(err){
                            console.log("error while geting........", err)
                        }else{
                            console.log("successfully!", data)
                            res.status(200).send({message: "same book added quatity", status: data})
                        }
                    })
                }
                
                //add diffrent book into bookstore:-
                else{
                    CartMember.findOneAndUpdate({memberId: req.user.user_detail._id}, {
                        "$push": {
                            "bookItems": req.body.bookItems
                        }
                    }).exec((err, data)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(data)
                        }
                    })
                }

            // new user created cart
            }else{
                const cart= new CartMember({
                    memberId: req.user.user_detail._id,
                    bookItems: [req.body.bookItems]
                });
                cart.save((err, data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                        res.send({message: "created cart successfully!", status: data})
                    }
                })
            }
        })
    }
    catch(err){
        console.log(err)
    }
}

