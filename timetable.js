// ---------- Timetable ----------
const timetable = document.getElementById("timetable");
timetable.value = localStorage.getItem("timetable") || "";

function saveTimetable() {
  localStorage.setItem("timetable", timetable.value);
  alert("Timetable saved!");
}

// ---------- Notes ----------
const notes = document.getElementById("notes");
notes.value = localStorage.getItem("notes") || "";

function saveNotes() {
  localStorage.setItem("notes", notes.value);
  alert("Notes saved!");
}

// ---------- To Do List ----------
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateDashboard() {
  document.getElementById("totalTasks").innerText = tasks.length;
  document.getElementById("completedTasks").innerText =
    tasks.filter(t => t.completed).length;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateDashboard();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;
    taskList.appendChild(li);
  });
  updateDashboard();
}

function addTask() {
  if (taskInput.value.trim() === "") return;
  tasks.push({ text: taskInput.value, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();

// ---------- Pomodoro Timer ----------
let time = 25 * 60;
let timerInterval = null;

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time's up! Take a break 🎉");
      return;
    }
    time--;
    updateTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 25 * 60;
  updateTimer();
}

function updateTimer() {
  document.getElementById("minutes").innerText =
    String(Math.floor(time / 60)).padStart(2, "0");
  document.getElementById("seconds").innerText =
    String(time % 60).padStart(2, "0");
}

updateTimer();