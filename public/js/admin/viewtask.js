document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchform");
    const searchuser = document.getElementById("searchuser");
    const searchtask = document.getElementById("searchtask");
    const tableBody = document.getElementById("usert");

    fetchTasks();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetchTasks();
    });

    function fetchTasks() {
        console.log(searchuser.value+" "+searchtask.value);
        
        fetch("/api/alltasks", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: searchuser.value,   
                task: searchtask.value
            })
        })
        .then(res => res.json())
        .then(data => {
            let rows = "";

            if (data.length === 0) {
                rows = `
                    <tr>
                        <td colspan="5" class="text-center text-muted">
                            No tasks found
                        </td>
                    </tr>`;
            } else {
                data.forEach((item, index) => {
                    rows += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.user.name}</td>
                            <td>${item.user.email}</td>
                            <td>${item.title}</td>
                            <td>${new Date(item.createdAt).toLocaleDateString()}</td>
                        </tr>
                    `;
                });
            }

            tableBody.innerHTML = rows; // ✅ render table
        })
        .catch(err => console.error(err));
    }
});
