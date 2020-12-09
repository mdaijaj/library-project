const Member=require('../models/member_schema');
const Book=require('../models/books_schema')
const Bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {login_required}=require('../middleware/index');
const { buildCheckFunction } = require('express-validator');
const { ConnectionStates } = require('mongoose');

//register member
exports.register=(req,res,next)=>{
    try{   
        Member.findOne({email: req.body.email}).exec();
        const { 
            firstname, lastname, adhar_no, email, father_name, dob, age, address, 
            contact_no, city, state, category, description
        }= req.body;
        
        
        const member=new Member({
            firstname, lastname, email, adhar_no, 
            password: Bcrypt.hashSync(req.body.password, 10),
            father_name, dob, age, address, 
            contact_no, city, state, category, description
        })
        var token = jwt.sign({ user_detail: member }, process.env.JWT_SECRET, {expiresIn: 86400 }); // expires in 24 hours
        console.log(token)
        member.save((err, data)=>{
            if(err){
                console.log(err)
                return res.send(err)
            }
            else{
                return res.send({user_detail: data})
            }
        })
    }
    catch(err){
        console.log(err)
        res.send("not found data....")
    }
}


//show all member
exports.all_member= async (req,res)=>{
    try{   
        const all_data=await Member.find();
        // console.log(all_data)
        res.send(all_data)
    }
    catch(err){
        console.log(err)
        res.send("not found data....")
    }
}


//find member by member id
exports.memberidfound= async (req,res)=>{
    try{
        const memberId=req.params.id
        const mail=await Member.findById({_id: memberId}).exec()
        if(mail){
            console.log("data found")
            res.send(mail)
        }else{
            res.send({message: "member id is not found"})
        }
    }
    catch(err){
        console.log("err",err)
    }
}


// find member by member name
exports.memberfoundName= async (req,res)=>{
    try{
        const name=req.query.firstname
        const member_detail=await Member.find({firstname: name}).exec()
        if(member_detail){
            console.log(member_detail)
            res.send(member_detail)
        }else{
            res.send({message: "member id is not found"})
        }
    }
    catch(err){
        console.log("err",err)
    }
}


//update member details by member id
exports.updateMemberDetail= async(req,res)=>{
    try{
        const memberId=req.params.id
        const details=await Member.findByIdAndUpdate(memberId, {$set: req.body}, { new: true })
        if(details){
            console.log("data found")
            res.send(details)
        }else{
            res.send({message: "member id is not found"})
        }
    }
    catch(err){
        console.log("err",err)
    }
}

//delete member by member id
exports.deleteMember= async(req,res)=>{
    try{
        const memberId=req.params.id
        const detail=await Member.findByIdAndRemove(memberId)
        if(detail){
            console.log("deleted successfully!")
            res.send({message: "deleted successfully"})
        }else{
            console.log("not found id....")
            res.send({message: "not found id..."})
        }
    }
    catch(err){
        console.log("err",err)
    }
}



