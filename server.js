const express=require("express");
const user=require("./models/Users");
const task=require("./models/Tasks");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// console.log("enter server.js");

const authRoutes=require("./routes/authroutes.js");
app.use("/api",authRoutes);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/login.html");
   
});

app.get("/register",(req,res)=>{
    res.sendFile(__dirname + "/views/registration.html");
})


// const loginroute=require("./routes/loginroute.js");
// app.use("/api",loginroute);
// app.get("/login",(req,res)=>{
//     res.sendFile(__dirname+"/views/login.html");
// })

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000"); 
})

// user.create({
//     name:"Netra",
//     password:"Netr2123",
//     email:"net@gmail.com"
// }).then(()=>{
//     console.log("Inserted Successfully");
    
// }).catch(()=>{
//     console.log(Error);
    
// })