let todos=new Array();

const getData=async ()=>{
    const data=await fetch("./todos.json");
    return await data.json();
}

const priority={
    "high": "높음",
    "medium": "보통",
    "low": "낮음",
}
const load=(list)=>{
    document.querySelector("#todoList").innerHTML=list
    .map(todo=>`
        <div class="todo-item ${todo.completed ? "completed" : ""}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${priority[todo.priority]}</span>
                    <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
                </div>
            </div>
            <p class="todo-description">${todo.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${todo.dueDate}</span>
                    <span>📝 생성: ${todo.createdAt}</span>
                </div>
            </div>
        </div>
    `).join("");


    document.querySelector("#totalCount").textContent=todos.length;
    document.querySelector("#completedCount").textContent=todos.filter(todo=>todo.completed).length;
    document.querySelector("#pendingCount").textContent=todos.filter(todo=>!todo.completed).length;
}

document.querySelector(".filter-buttons").addEventListener("click", e=>{
    if(!e.target.classList.contains("filter-btn")) return;

    document.querySelector(".filter-btn.active").classList.remove("active");
    e.target.classList.add("active");

    const idx=[...document.querySelectorAll(".filter-btn")].indexOf(e.target);

    switch(idx){
        case 0:
            load(todos);
            break;
        case 1:
            load(todos.filter(todo=>!todo.completed));
            break;
        case 2:
            load(todos.filter(todo=>todo.completed));
            break;
        case 3:
            load(todos.filter(todo=>todo.priority==="high"));
            break;
    }
})


getData().then(res=>{
    todos=res.todos;
    console.log(todos)
    load(todos);
});