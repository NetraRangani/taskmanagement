let btnaddtask=document.getElementById("btnaddtask");
let tabletask=document.getElementById("tasktable");
btnaddtask.addEventListener("click",async(e)=>{
    e.preventDefault();
    let taskname=document.getElementById("taskname").value;
    let taskdesc=document.getElementById("taskdesc").value;
    let duedate=document.getElementById("duedate").value;
    let status=document.getElementById("taskstatus").value;

    let res=await fetch("/task/addtask",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({taskname,taskdesc,duedate,status})
    });
    console.log(taskname+taskdesc+duedate+status);

    let data= await res.json();
    alert(data.message);
    // console.log(data.record);
    if(data.message==="Task Added!"){
        window.location.href="/tasks";
    }

});


