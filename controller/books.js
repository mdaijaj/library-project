
const Book= require('../models/books_schema')
    

// add books 
exports.addBooks= async(req,res,next)=>{
    try{
        const {
            subject, author, publish, publisher, ISBN, language, description
        }= req.body

        let productPicture=[]

        if(req.files.length>0){
            productPicture= req.files.map(file=>{
                return { img: file.filename}
            })
        }
        const books= new Book({
            subject,
            author,
            publish,
            publisher,
            ISBN,
            productPicture,
            language,
            description
        })
        console.log(books)
        books.save((err, data)=>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })
        res.status(200).send({
            file:req.files, body: req.body
        })
    }
    catch(err){
        console.log("err", err)
    }
}


//show all books
exports.showBooks= async(req,res,next)=>{
    try{
        console.log("api is working here...")
        const all_data=await Book.find();
        console.log(all_data)
        res.send(all_data)
    }
    catch(err){
        console.log(err)
    }
}


