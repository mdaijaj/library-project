const mongoose=require('mongoose')
const env= require('dotenv');

//connect to db
env.config();
mongoose.Promise=global.Promise;
const url= process.env.URL;

const connect= mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true,
    useFindAndModify: false
})

connect.then((data)=>{
    if(data){
        console.log("db connected successfully!")
    }
    else{
        console.log("unable to connect server...")
    }
})

module.exports= connect;