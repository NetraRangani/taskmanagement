const user=require("../models/Users")
const Task=require("../models/Tasks")
const bcrypt=require("bcrypt");
// console.log("enter auth.js");
exports.registerUser=async(req,res)=>{
    try{
        let {name,email,pwd,cpwd}=req.body;
        if(!name || !email || !pwd || !cpwd){
            return res.status(400).json({"message":"All Fields Required"});
        }
        if(pwd!=cpwd){
            return res.status(404).json({"message":"Passwords does't match!"});
        }
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let str=re.test(pwd);
        if(!str){
            return res.status(404).json({"message":"Passwords shouls have altest 8 character,no spaces and special characters and alphanumeric values"});
        }

        let existUser=await user.findOne({email});
        console.log(existUser);
        if(existUser){
            return res.status(409).json({"message":"User already exists!"});
        }
        let hashPwd=await bcrypt.hash(pwd,10);

        await user.create({
            name,email,password:hashPwd
        });
        res.status(201).json({"message":"User Registered Successfully!"});


    }catch(error){
        res.status(500).json({"message":"Server Error"});
    }
};

exports.loginUser=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let exists=await user.findOne({email});
        console.log(exists);
        
        if(exists){
            let match=bcrypt.compare(password, exists.password);
            if(match){
                req.session.userId=exists._id;
                req.session.role=exists.role;
                if(exists.role==="admin"){
                    req.session.username="admin";
                    return res.status(201).json({"message":"Admin Login Successful"});
                    // res.redirect("/admindashboard");
                }else{
                    return res.status(201).json({"message":"Login Successful!"});
                }
                // console.log(req.session.userId);
            }else{
                res.status(404).json({"message":"Incorrect email or password!"});
            }
        }else{
            res.status(404).json({"message":"Incorrect email or password!"});
        }
    }catch(error){
        res.status(500).json({"message":"Server Error"});
    }
}

exports.allUsers=async(req,res)=>{
    try{
        let alluser=await user.find({role:"user"});
        if(alluser){
            res.status(200).json({alluser});
        }else{
            res.status(404).json({"message":"Something went Wrong!"});
        }
    }catch(error){
        res.status(500).json({"message":"Server Error!"});
    }
    
}

exports.allTasks = async (req, res) => {
    try {
        let { user, task: tasksearch } = req.body;  
        console.log("REQ BODY:", req.body);

        let pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" }
        ];

        // Apply search only if values exist
        if (user || tasksearch) {
            pipeline.push({
                $match: {
                    ...(user && { "user.name": { $regex: user, $options: "i" } }),
                    ...(tasksearch && { title: { $regex: tasksearch, $options: "i" } })
                }
            });
        }

        pipeline.push({
            $project: {
                title: 1,
                description: 1,
                status: 1,
                dueDate: 1,
                createdAt: 1,
                "user.name": 1,
                "user.email": 1,
                "user.role": 1
            }
        });

        const result = await Task.aggregate(pipeline);
        res.status(200).json(result);

    } catch (err) {
        console.error("ALL TASK ERROR:", err);
        res.status(500).json({ message: "Server Error!" });
    }
};


