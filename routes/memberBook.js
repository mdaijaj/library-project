const express=require('express');
const {showBooks}= require('../controller/books');
const {addtocart}= require('../controller/book_to_member');
const {login_required, userMiddleware}= require('../middleware/index')
// const { route } = require('./books');
const router=express.Router();

router.get('/books/show', showBooks);
router.post('/user/takeBook', login_required, userMiddleware, addtocart);
// router.get('/returnBooks/:id', returnBook)

module.exports=router;  