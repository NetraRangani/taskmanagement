const express=require("express");
const user=require("./models/Users");
const task=require("./models/Tasks");
const session=require("express-session");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// console.log("enter server.js");
app.use(session({
    secret:"abcDEFghiJKl123",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:24*60*60*1000}
}))
const authRoutes=require("./routes/authroutes.js");
app.use("/api",authRoutes);

const taskRoutes=require("./routes/taskroutes.js");
app.use("/task",taskRoutes)

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/register",(req,res)=>{
    res.sendFile(__dirname + "/views/registration.html");
})

app.get("/dashboard",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/views/dashboard.html");
})

app.get("/sidebar",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/views/sidebar.html");
})

app.get("/tasks",(req,res)=>{
    if(!req.session.userId){
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/views/tasks.html");
})

app.get("/adminlogin",(req,res)=>{
    res.sendFile(__dirname+"/views/admin/admindashboard.html");
})

app.get("/adminsidebar",(req,res)=>{
    res.sendFile(__dirname + "/views/admin/sidebaradmin.html");
})

app.get("/admindashboard",(req,res)=>{
    res.sendFile(__dirname + "/views/admin/admindashboard.html");
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