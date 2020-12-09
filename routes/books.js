const express=require('express')
const {login_required, adminMiddelware}=require('../middleware/index');
const {addBooks, showBooks, findBookId}= require('../controller/books')
const router=express.Router();

const multer=require('multer')
const shortId=require('shortid')
const path=require('path')


const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
    cb(null, path.join(path.dirname(__dirname), 'upload') )
    },
    filename: (req, file, cb)=> {
    cb(null, shortId.generate() + '-' + file.originalname)
    }
})
const upload = multer({storage})


//only admin add produPOSTct
router.post('/admin/addbook', login_required, adminMiddelware, upload.array('productPicture'), addBooks)
router.get('/books/show', showBooks);
// router.get('/books/:id', findBookId);


module.exports=router;
