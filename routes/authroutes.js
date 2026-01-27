const express=require("express");
// console.log("enter route.js");

const router=express.Router();
const {registerUser,loginUser,allUsers}=require("../controllers/auth.js");

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/alluser",allUsers);

module.exports=router;