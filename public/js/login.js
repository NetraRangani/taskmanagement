let btnlogin=document.getElementById("btnlogin");

btnlogin.addEventListener("click",async(e)=>{
    e.preventDefault();
    let email=document.getElementById("email").value;
    let pwd=document.getElementById("password").value;

    let res=await fetch("/api/login",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({email,password:pwd}),
    });

    const data=await res.json();
    const status=res.status;
    alert(data.message);
    if(status===201){
        window.location.href="/dashboard";  
    }else if(status===404){
        window.location.href="/";
    }
})