const express=require("express");
const router=express.Router();
let {addTask,allTask}=require("../controllers/taskauth.js");
router.post("/addtask",addTask);
router.get("/alltask",allTask);
module.exports=router;