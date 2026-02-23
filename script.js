function formatTimeAMPM(time){

if(!time) return "";

let [hour, minute] = time.split(":");
hour = parseInt(hour);

let period = hour >= 12 ? "PM" : "AM";

if(hour > 12) hour -= 12;
if(hour === 0) hour = 12;

return `${hour}:${minute} ${period}`;
}

window.onload = loadTasks;

function addTask(){

let task = document.getElementById("taskInput").value;
let deadline = document.getElementById("deadline").value;
let time = document.getElementById("taskTime").value;
let priority = document.getElementById("priority").value;

if(task===""){
alert("Enter task");
return;
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.push({
task,
deadline,
time,
priority,
status:"Pending"
});

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();

setReminder(task, deadline, time);

document.getElementById("taskInput").value="";
document.getElementById("deadline").value="";
document.getElementById("taskTime").value="";
}

/* Load Tasks */

function loadTasks(){

let table = document.getElementById("taskTable");
table.innerHTML="";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((t,index)=>{

let formattedTime = formatTimeAMPM(t.time);

let row = table.insertRow();

row.innerHTML = `
<td>${t.task}</td>
<td>${t.deadline} ${formattedTime}</td>
<td>${t.priority}</td>
<td onclick="toggleStatus(${index})">${t.status}</td>
<td>
<button onclick="editTask(${index})">Edit</button>
<button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
</td>
`;

});
}

function deleteTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.splice(index,1);

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();
}

function editTask(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let newTask = prompt("Enter new task name");

if(newTask){
tasks[index].task = newTask;
localStorage.setItem("tasks", JSON.stringify(tasks));
loadTasks();
}
}

function toggleStatus(index){

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks[index].status =
tasks[index].status==="Pending" ? "Completed" : "Pending";

localStorage.setItem("tasks", JSON.stringify(tasks));

loadTasks();
}

/* Reminder Demo Function */

function setReminder(task, date, time){

if(!date || !time) return;

let taskDateTime = new Date(date + "T" + time);

let reminderTime = taskDateTime.getTime() - (2 * 60 * 60 * 1000);

let delay = reminderTime - Date.now();

if(delay > 0 && delay < 2147483647){

setTimeout(()=>{
alert(" Reminder: Task '" + task + "' is coming in 2 hours!");
}, delay);

}
}
