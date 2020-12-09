const express=require('express');
const {login_required}=require('../middleware/index');
const {validateRequest, isRequestValidated}= require('../validation/auth');
const {register,all_member,memberidfound,memberfoundName,updateMemberDetail, deleteMember} = require('../controller/members');
const router=express.Router();


//signup page
router.post('/user/register', validateRequest, isRequestValidated, register);
router.get('/user/all_member', login_required, all_member);
router.get('/user/member/:id', login_required, memberidfound)
router.get('/user/member', login_required, memberfoundName);
router.put('/user/member/:id', login_required, updateMemberDetail);
router.delete('/user/member/:id', deleteMember);


module.exports=router;  