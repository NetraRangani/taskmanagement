const mongoose=require("mongoose");
const conn=mongoose.connect("mongodb://localhost:27017/taskmanagement");
const DB_URL=process.env.DB_URL;

conn.then(()=>{
    console.log("Tasks Connection Established!");    
}).catch(()=>{
    console.log(Error);
})

const taskSchema=new mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:String,
        enum:["Pending","In-Progress","Completed"],
        default:"Pending"
    },
    dueDate:Date,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true});

module.exports=mongoose.model("tasks",taskSchema);