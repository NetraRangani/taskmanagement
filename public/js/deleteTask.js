async function deleteTasks(){
    console.log("delete");
    let id=document.getElementById("deleteTaskId").value;
    let res=await fetch("/task/delete",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({id})
    });

    let data=await res.json();
    alert(data.message);
    if(data.message==="Deletion Successful!"){
        window.location.href="/tasks";
    }
}