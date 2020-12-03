const User=require('../models/user_schema')
const Bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


//signup new user
exports.signup= (req,res, next)=>{
    try{   
        User.findOne({email: req.body.email}).exec();
        const {firstname, lastname, email}=req.body;
        //object users
        const user= new User({  
            firstname,
            lastname,
            email,
            password: Bcrypt.hashSync(req.body.password, 10),
            username: Math.random().toString()
        })
        user.save((err, data)=>{
            if(err){
                return res.send({message: "you allready signup please login"})
            }
            else{
                return res.send({user_detail: data})
            }
        })
    }
    catch(err){
        console.log(err)//   userSchema.virtual("password")
        res.send("not found data....")
    }
}


//login userBcrypt
exports.login= async (req,res,next)=>{
    try{
        const mail=await User.findOne({email: req.body.email}).exec()
        if(mail){
            console.log(mail)
            if(Bcrypt.compareSync(req.body.password, mail.password) &&  (mail.roll=="user")){
                console.log("encrypted password match success!")
                var token = jwt.sign({ user_detail: mail }, process.env.JWT_SECRET, {expiresIn: 86400 }); // expires in 24 hours
                res.cookie('token', token, {expiresIn: '1h'});
                // res.send()
                res.send({
                    token: token,
                    user_detail: mail
                })
            }else{
                console.log("invalid email idmail and password.")
                res.send({message:"invalid email id and password....."})
            }
        }       
        else{
            res.send({message:"email not found....."})
        }
    }
    catch(err){
        console.log("err",err)
    }       
}


//logout
exports.logout= (req,res,next)=>{
    try{
        console.log("aijaj khan")
        res.clearCookie('token')
        res.status(200).send({
            message: "Signout successfully!"
        })
    }
    catch{
        console.log(err)
    } 
}