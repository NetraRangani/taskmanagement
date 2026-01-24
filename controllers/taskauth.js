const task=require("../models/Tasks");

exports.addTask=async(req,res)=>{
    let userid=req.session.userId;
    try{
        let {taskname,taskdesc,duedate,status}=req.body;
        // console.log(req.body);
        // console.log(taskname+taskdesc+duedate+status);
        
        if(!taskname || !taskdesc || !duedate || !status){
            return res.status(400).json({"message":"All Fields are required!"});
        }
        let record= await task.create({
            title:`${taskname}`,
            description:`${taskdesc}`,
            duedate:`${duedate}`,
            status:`${status}`,
            createdBy:`${userid}`
        });
        console.log(record);
        
        if(record){
            res.status(201).json({"message":"Task Added!"});
        }else{
            res.status(404).json({"message":"Try Again!"});
        }
    }catch(error){
        res.status(500).json({"message":error});
    }
}

exports.allTask=async(req,res)=>{
    let userid=req.session.userId;
    try{
        const allRecords=await task.find({"createdBy":`${userid}`}).sort({"createdAt":-1});
        res.status(200).json({allRecords});
    }catch(error){
        res.status(500).json({"message":"Server Error"});
    }
}