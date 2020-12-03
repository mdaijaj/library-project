const express=require('express')
const app=express();
const path=require('path')

//db connect
const connect=require('./database/db')
connect.then((data)=>{
    if(data){
        console.log("db connected successfully!")
    }
    else{
        console.log("unable to connect server...")
    }
})
    
//middleware
app.use(express.json());

//routes
let adminRouter=require('./routes/admin');
let userRouter=require('./routes/users')
let booksRouter=require('./routes/books');
let memberRouter=require('./routes/members')

//middleware
app.use('/', userRouter)
app.use('/', adminRouter)
app.use('/', booksRouter)
app.use('/', memberRouter)


//server port
const port= process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening this port: ${port}`)
})