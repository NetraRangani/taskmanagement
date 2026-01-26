const express=require("express");
const router=express.Router();
let {addTask,allTask,editTask,deleteTask}=require("../controllers/taskauth.js");
router.post("/addtask",addTask);
router.get("/alltask",allTask);
router.post("/edit",editTask);
router.post("/delete",deleteTask);
module.exports=router;