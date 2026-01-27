const express=require("express");
// console.log("enter route.js");

const router=express.Router();
const {registerUser,loginUser,allUsers,allTasks}=require("../controllers/auth.js");

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/alluser",allUsers);
router.post("/alltasks",allTasks);

module.exports=router;