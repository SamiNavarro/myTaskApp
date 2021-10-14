// TASK 7 we'll create a function using template literals to return the HTML for each individual task.
// Create a new function called createTaskHtml accepting the following parameters (name, description, assignedTo, dueDate, status)

const createTaskHtml = (
  id,
  taskName,
  description,
  assignedTo,
  dueDate,
  taskStatus
) => {
  let html = `      
     <div class="task-body" data-task-id="${id}">
        
        <div class="task-header" id="dropdown">
            <h2 class="task-title">${taskName}<span class="dropdown-icon"><i class="fas fa-caret-down"></i></span></h2>
        </div>
        <div class="task-dropdown" id="taskDropdown">
            <div class="task-info">
              <h3>Task description:</h3>
              <div id="description-input">
                 <p>${description}</p>   
              </div>
            </div>
            <div class="task-info">
                <h3>Assigned to:</h3>
                <div id="assigned-input">
                    <p>${assignedTo}</p>
                </div>
            </div>
            <div class="task-info">
                <h3>Due date:</h3>
                <div id="date-input">
                    <p>${dueDate}</p>
                </div>
            </div>
            <div class="task-info">
                <div class="status">
                    <h3>Status:</h3>
                    <p class="${taskStatus}">${taskStatus}</p> 
                </div>
            </div> 
            <div class="btn options-btn">
              <button class="btn-form done-button"><i class="far fa-check-circle done-button"></i></button>
              <button class="btn-form delete-button"><i class="far fa-trash-alt delete-button"></i></button>   
            </div> 
        </div>
      </div>`;
  return html;
};

// Create a TaskManager Class on  line 2 is a constructor with a parameter currentID set to 0 by default.
class TaskManager {
  constructor(currentId = 0) {
    // initialize an empty array
    this._tasks = [];
    // initialize a currentId set tocurrentId
    this.currentId = currentId;
  }
  // function getter should return the value of our tasks array
  get tasks() {
    return this._tasks;
  }
  //  add task function, create an object and push it to the tasks array

  addTask(
    taskName = "",
    description = "",
    assignedTo = "",
    dueDate = "",
    taskStatus = "",
    listId = ""
  ) {
    let newTask = {
      id: this.currentId,
      taskName: taskName,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      taskStatus: taskStatus,
      listId: listId,
    };

    this.currentId++;
    // push newly created object to tasks  array
    this.tasks.push(newTask);
  }

  getTaskById(taskId) {
    let foundTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        foundTask = task;
      }
    }
    return foundTask;
  }

  render(activeList) {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      if (activeList == task.listId) {
        // Format the date
        const date = new Date(task.dueDate);
        const formattedDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        // Create the task html
        const taskHtml = createTaskHtml(
          task.id,
          task.taskName,
          task.description,
          task.assignedTo,
          formattedDate,
          task.taskStatus
        );
        // Push it to the tasksHtmlList array
        tasksHtmlList.push(taskHtml);
      }
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#taskBody");
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    /******** new for task 9 ********/
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this._tasks);

    // Store the JSON string in localStorage
    localStorage.setItem("tasks", tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem("currentId", currentId);
  }

  load() {
    /******** new for task 9 ********/
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
      // Get the JSON string of tasks in localStorage
      const tasksJson = localStorage.getItem("tasks");

      // Convert it to an array and store it in our TaskManager
      this._tasks = JSON.parse(tasksJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("currentId")) {
      // Get the currentId string in localStorage
      const currentId = localStorage.getItem("currentId");

      // Convert the currentId to a number and store it in our TaskManager
      this.currentId = Number(currentId);
    }
  }

  deleteTask(taskId) {
    /******** new for task 10 ********/
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];

      // Check if the task id is not the task id passed in as a parameter
      if (task.id !== taskId) {
        // Push the task to the newTasks array
        newTasks.push(task);
      }
    }

    // Set this.tasks to newTasks
    this._tasks = newTasks;
  }

  colorPattern() {
    let pending = document.getElementsByClassName("Pending");
    for (let i = 0; i < pending.length; i++) {
      pending[
        i
      ].parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.style.backgroundColor =
        "#DA7055";
      console.log(
        pending[i].parentNode.parentNode.parentNode.parentNode.childNodes[0]
          .nextSibling
      );
    }

    let inProgress = document.getElementsByClassName("In Progress");
    for (let i = 0; i < inProgress.length; i++) {
      inProgress[
        i
      ].parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.style.backgroundColor =
        "#D9CA55";
      console.log("I am changing the colour");
    }

    let completed = document.getElementsByClassName("Completed");
    for (let i = 0; i < completed.length; i++) {
      completed[
        i
      ].parentNode.parentNode.parentNode.parentNode.childNodes[0].nextSibling.style.backgroundColor =
        "#85C12C";
      console.log("I am changing the colour");
    }
  }
}

// let taskList = new TaskManager();

// console.log(taskList);

// taskList.addTask("sprint 1", "Creat a class" , "Sami Phil", "26/09/21", "Pending");

// taskList.addTask("sprint 2", "Creat a array" , "Sami & Phil", "29/09/21", "Pending");

// console.log(taskList.tasks);
