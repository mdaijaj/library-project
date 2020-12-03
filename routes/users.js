const express=require('express');
const {login_required}=require('../middleware/index');
const {validateRequest, isRequestValidated}= require('../validation/auth');
const { signup, login, logout } = require('../controller/user');
const router=express.Router();


//routes here...
router.post('/user/signup', validateRequest, isRequestValidated, signup)
router.post('/user/login', login)
router.post('/user/logout', login_required, logout)
router.post('/user/profile', login_required, (req,res)=>{
    res.send("aijaj khan done")
})


module.exports=router;