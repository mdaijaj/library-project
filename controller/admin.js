const Admin=require('../models/admin_schema');
const Bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.signup= (req,res, next)=>{
    try{   
        Admin.findOne({email: req.body.email}).exec()
        const {firstname, lastname, email}=req.body;
        //object users
        const user= new Admin({
            firstname,
            lastname,
            email,
            password: Bcrypt.hashSync(req.body.password, 10),
            username: Math.random().toString(),
            roll: "admin"
        })
        // console.log("user:", user)
        user.save((err, data)=>{
            if(err){
                return res.send({message: "admin allready signup please login"})
            }
            // console.log("data:", data)
            return res.send({message: "Admin regesiter sucessfully!", user_detail: data})
        })
    }
    catch(err){
        console.log(err)
        res.send("not found data....")
    }
}

exports.login= async(req,res,next)=>{
    try{
        const mail=await Admin.findOne({email: req.body.email}).exec()
        console.log("mail:", mail)
        if(mail){
            if(Bcrypt.compareSync(req.body.password, mail.password) &&  (mail.roll=="admin")){
                console.log("match or not_match")
                var token = jwt.sign({ user_detail: mail }, process.env.JWT_SECRET, {expiresIn: 86400 }); // expires in 24 hours
                res.cookie('token', token, {expiresIn: '1h'})
                res.send({
                    token: token,
                    user_detail: mail
                })
            }else{
                console.log("something wrong here.")
                res.send({message:"invalid email id and password....."})
            }
        }else{
            res.send({message:"invalid email id and password....."})
        }
    }
    catch(err){
        console.log("err", err)
    }
}



exports.logout=(req,res, next)=>{
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


exports.profile=(req,res,next)=>{
    try{
        res.send("api chech  done")
    }
    catch(err){
        console.log(err)
    }
}