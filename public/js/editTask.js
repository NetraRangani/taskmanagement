async function updateTask() {
    let taskname=document.getElementById("editTaskName").value;
    let taskdesc=document.getElementById("editTaskDesc").value;
    let status=document.getElementById("editTaskStatus").value;
    let taskid=document.getElementById("editTaskId").value;
    let duedate=document.getElementById("editduedate").value;
    console.log(taskname+" "+taskdesc+status+taskid);
    
    let res= await fetch("/task/edit",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({taskname,taskdesc,status,taskid,duedate})
    });

    let data= await res.json();
    alert(data.message);
    if(data.message==="Record Updated Successfully!"){
        window.location.href="/tasks";
    }
    
}