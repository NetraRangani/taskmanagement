const mongoose=require("mongoose");
const DB_URL=process.env.DB_URL;
const conn=mongoose.connect("mongodb://localhost:27017/taskmanagement");

conn.then(()=>{
    console.log("Users Connection Established!");
}).catch(()=>{
    console.log(Error);
});


const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true});

module.exports=mongoose.model("users",userSchema);