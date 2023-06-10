
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTask');
const taskInput = document.getElementById('task');
const targetDateInput = document.getElementById('targetDate');
const importanceInput = document.getElementById('importance');

let tasks = [];

function addTask() {
  const task = taskInput.value.trim();
  const targetDate = targetDateInput.value;
  const importance = importanceInput.value;

  if (task === '') {
    alert('Please enter a task!');
    return;
  }

  const newTask = {
    task: task,
    targetDate: targetDate,
    importance: importance
  };

  tasks.push(newTask);

  renderTasks();

  taskInput.value = '';
  targetDateInput.value = '';
  importanceInput.value = 'Very Important';

  saveTasksToLocalStorage();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  renderTasks();

  saveTasksToLocalStorage();
}

function moveTaskUp(index) {
  if (index === 0) {
    return;
  }

  const task = tasks[index];
  tasks.splice(index, 1);
  tasks.splice(index - 1, 0, task);

  renderTasks();

  saveTasksToLocalStorage();
}

function moveTaskDown(index) {
  if (index === tasks.length - 1) {
    return;
  }

  const task = tasks[index];
  tasks.splice(index, 1);
  tasks.splice(index + 1, 0, task);

  renderTasks();

  saveTasksToLocalStorage();
}
function editTask(index) {
  const task = tasks[index];
  const newTask = prompt('Enter the new task name:', task.task);
  const newTargetDate = prompt('Enter the new target date:', task.targetDate);

  if (newTask !== null && newTargetDate !== null) {
    tasks[index].task = newTask.trim();
    tasks[index].targetDate = newTargetDate;

    renderTasks();

    saveTasksToLocalStorage();
  }
}
function finishTask(index) {
  tasks[index].finished = true;

  renderTasks();

  saveTasksToLocalStorage();

  const taskText = document.getElementById(`taskText-${index}`);
//   taskText.style.textDecoration = 'line-through';
  taskText.classList.add('firework'); // Add this line to add the "firework" class
}


function renderTasks() {
  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const listItem = document.createElement('tr');
    const taskNumber = document.createElement('td');
    const taskText = document.createElement('td');
    taskText.id = `taskText-${i}`; // Added ID to task name cell
    const targetDate = document.createElement('td');
    const importanceColumn = document.createElement('td');
    const actionsColumn = document.createElement('td');
    const taskDesc = document.createTextNode(task.task);
    const targetDateText = document.createTextNode(task.targetDate);
    const importanceText = document.createTextNode(
      task.finished ? 'Finished' : task.importance
    );
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const upBtn = document.createElement('button');
    const downBtn = document.createElement('button');
    const finishBtn = document.createElement('button');

    taskNumber.textContent = i + 1;
    taskText.appendChild(taskDesc);
    targetDate.appendChild(targetDateText);
    importanceColumn.appendChild(importanceText);
    upBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/></svg>';
    downBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/></svg>';
    editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg>';
    finishBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>';


    upBtn.addEventListener('click', () => moveTaskUp(i));
    deleteBtn.addEventListener('click', () => deleteTask(i));
    
    downBtn.addEventListener('click', () => moveTaskDown(i));
    editBtn.addEventListener('click',()=> editTask(i));
    finishBtn.addEventListener('click',()=> finishTask(i));

    actionsColumn.classList.add('actions');
    actionsColumn.appendChild(finishBtn);
    actionsColumn.appendChild(upBtn);
    actionsColumn.appendChild(downBtn);
    actionsColumn.appendChild(editBtn);
    actionsColumn.appendChild(deleteBtn);
    

    listItem.appendChild(taskNumber);
    listItem.appendChild(taskText);
    listItem.appendChild(targetDate);
    listItem.appendChild(importanceColumn);
    listItem.appendChild(actionsColumn);

    // Set the importance class based on the task importance
    if (task.importance === 'Very Important') {
      importanceColumn.classList.add('very-important');
    } else if (task.importance === 'Important') {
      importanceColumn.classList.add('important');
    } else if (task.importance === 'Not Very Important') {
      importanceColumn.classList.add('not-very-important');
    }

    taskList.appendChild(listItem);
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

addTaskButton.addEventListener('click', addTask);

loadTasksFromLocalStorage();