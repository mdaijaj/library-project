const express=require('express');
const {validateRequest, isRequestValidated}= require('../validation/auth');
const {login_required}= require('../middleware/index');
const { signup, login, logout, profile } = require('../controller/admin');
const router=express.Router();


//signup method
router.post('/admin/signup', validateRequest, isRequestValidated, signup);
router.post('/admin/login', login);
router.post('/admin/logout', login_required, logout)
router.post('/admin/profile', login_required, profile)

module.exports=router;