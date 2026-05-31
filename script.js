var taskInput = document.getElementById('taskInput');
var addBtn = document.getElementById('addTaskBtn');
var taskList = document.getElementById('taskList');
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    var taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

   tasks.push(taskText);
   saveTasks();
   renderTask(taskText);
   taskInput.value = "";
}


function renderTask(taskText){
    var li= document.createElement('li');

    li.innerHTML = `
    <span>
    ${taskText}
    </span>
    <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(li);

    var deleteBtn = li.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
        li.remove();
    });

    var taskSpan = li.querySelector("span");
    taskSpan.addEventListener("click", ()=> {
        taskSpan.classList.toggle("completed");
    });

}

tasks.forEach(task => {
    renderTask(task);
});


taskInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addTask();
    }
});