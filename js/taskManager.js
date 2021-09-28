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
            <h2 class="task-title">${taskName}<span class="dropdown-icon">+</span></h2>
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
                    <p>${taskStatus}</p>
                </div>
            </div> 
            <div class="btn options-btn">
              <button class="btn-form done-button"><i class="far fa-check-circle done-button"></i></button>
              <button class="btn-form delete-btn"><i class="far fa-trash-alt"></i></button>
              <button class="btn-form edit-btn"><i class="far fa-edit"></i></button>    
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
  // function getter should return the value of pur books array
  get tasks() {
    return this._tasks;
  }
  //  add task function, create an object and push it to the tasks array

  addTask(
    taskName = "",
    description = "",
    assignedTo = "",
    dueDate = "",
    taskStatus = ""
  ) {
    let newTask = {
      id: this.currentId,
      taskName: taskName,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      taskStatus: taskStatus,
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

  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

  // Create the tasksHtml by joining each item in the tasksHtmlList
  // with a new line in between each item.
  const tasksHtml = tasksHtmlList.join("\n");

  // Set the inner html of the tasksList on the page
  const tasksList = document.querySelector("#taskBody");
  tasksList.innerHTML = tasksHtml;
}
}

// let taskList = new TaskManager();

// console.log(taskList);

// taskList.addTask("sprint 1", "Creat a class" , "Sami Phil", "26/09/21", "Pending");

// taskList.addTask("sprint 2", "Creat a array" , "Sami & Phil", "29/09/21", "Pending");

// console.log(taskList.tasks);
