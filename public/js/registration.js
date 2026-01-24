let btnreg=document.getElementById("btnregister");

// console.log("enter reg.js");

btnreg.addEventListener("click",async(e)=>{
    e.preventDefault();
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let pwd=document.getElementById("password").value;
    let cpwd=document.getElementById("cpassword").value;

    res=await fetch("/api/register",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({name,email,pwd,cpwd})
    });

    const data=await res.json();
    alert(data.message);

});