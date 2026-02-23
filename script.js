function formatTimeAMPM(time){

if(!time) return "";

let [hour, minute] = time.split(":");

hour = parseInt(hour);

let period = hour >= 12 ? "PM" : "AM";

if(hour > 12) hour -= 12;
if(hour === 0) hour = 12;

return `${hour}:${minute} ${period}`;
}

function addTask(){

let task = document.getElementById("taskInput").value;
let deadline = document.getElementById("deadline").value;
let time = document.getElementById("taskTime").value;

if(task===""){
alert("Enter task");
return;
}

let table = document.getElementById("taskTable");

let formattedTime = formatTimeAMPM(time);

let row = table.insertRow();

row.innerHTML = `
<td>${task}</td>
<td>${deadline} ${formattedTime}</td>
<td onclick="toggleStatus(this)">Pending</td>
<td><button class="delete-btn" onclick="this.parentElement.parentElement.remove()">Delete</button></td>
`;

setReminder(task, deadline, time);

document.getElementById("taskInput").value="";
document.getElementById("deadline").value="";
document.getElementById("taskTime").value="";
}

function toggleStatus(cell){

if(cell.innerText==="Pending"){
cell.innerText="Completed";
cell.style.textDecoration="line-through";
}else{
cell.innerText="Pending";
cell.style.textDecoration="none";
}

}

function setReminder(task, date, time){

if(!date || !time) return;

let taskDateTime = new Date(date+"T"+time);
let reminderTime = taskDateTime - (2*60*60*1000);

let now = new Date();

let delay = reminderTime - now;

if(delay > 0){

setTimeout(()=>{
alert("Reminder: Task '"+task+"' is coming in 2 hours!");
}, delay);

}
}