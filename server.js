const express=require('express')
const app=express();

//db connect
const connect=require('./database/db')
    
//routes
let adminRouter=require('./routes/admin');
let userRouter=require('./routes/users')
let booksRouter=require('./routes/books');
let memberRouter=require('./routes/members')
let memberBookRouter=require('./routes/memberBook')

//middleware
app.use(express.json());    
app.use('/', userRouter)
app.use('/', adminRouter)
app.use('/', booksRouter)
app.use('/', memberRouter)
app.use('/', memberBookRouter)

//server port
const port= process.env.PORT;
app.listen(port,()=>{
    console.log(`server is listening this port: ${port}`)
})