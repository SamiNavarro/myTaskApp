const taskManager = new TaskManager();

// Load the tasks from localStorage     /******** new for task 9 ********/
taskManager.load();
// Render the loaded tasks to the page      /******** new for task 9 ********/
taskManager.render();

const taskForm = document.querySelector("#taskForm");

//Selecting Id to validate input on the form
const taskName = document.querySelector("#task-name");
const description = document.querySelector("#description");
const assignedTo = document.querySelector("#assigned-to");
const dueDate = document.querySelector("#due-date");
const taskStatus = document.querySelector("#taskStatus");
const nameFeedback = document.querySelector("#nameFeedback");
const desFeedback = document.querySelector("#desFeedback");
const dateFeedback = document.querySelector("#dateFeedback");
const statusFeedback = document.querySelector("#statusFeedback");
const assignedFeedback = document.querySelector("#assignedFeedback");

let validationFail = 0;

//Check if the Task Name input value is more than 5 characters.

const validateInputs = (formInput, errorMsg, charCount) => {
  if (formInput.value.trim().length >= charCount) {
    formInput.classList.add("validated-field");
    formInput.classList.remove("non-validated-field");
    errorMsg.classList.add("validated-feedback");
    errorMsg.classList.remove("non-validated-feedback");
    errorMsg.classList.remove("error");
  } else {
    errorMsg.classList.add("error");
    formInput.classList.add("non-validated-field");
    formInput.classList.remove("validated-field");
    errorMsg.classList.add("non-validated-feedback");
    errorMsg.classList.remove("validated-feedback");
    validationFail++;
  }
};

const validateStatus = (statusInput, errorMsg) => {
  if (statusInput.value != 0) {
    errorMsg.classList.remove("error");
    taskStatus.classList.add("validated-field");
    taskStatus.classList.remove("non-validated-field");
    statusFeedback.classList.add("validated-feedback");
    statusFeedback.classList.remove("non-validated-feedback");
  } else {
    errorMsg.classList.add("error");
    taskStatus.classList.add("non-validated-field");
    taskStatus.classList.remove("validated-field");
    statusFeedback.classList.add("non-validated-feedback");
    statusFeedback.classList.remove("validated-feedback");
    validationFail++;
  }
};

function clearAll() {
  taskName.value = "";
  description.value = "";
  assignedTo.value = "";
  dueDate.value = "";
  taskStatus.value = "0";
  taskName.classList.remove("validated-field");
  description.classList.remove("validated-field");
  assignedTo.classList.remove("validated-field");
  dueDate.classList.remove("validated-field");
  taskStatus.classList.remove("validated-field");

  taskName.classList.remove("non-validated-field");
  nameFeedback.classList.remove("error");
  description.classList.remove("non-validated-field");
  desFeedback.classList.remove("error");
  assignedTo.classList.remove("non-validated-field");
  assignedFeedback.classList.remove("error");
  dueDate.classList.remove("non-validated-field");
  dateFeedback.classList.remove("error");
  taskStatus.classList.remove("non-validated-field");
  statusFeedback.classList.remove("error");
}

taskForm.addEventListener("reset", clearAll);
taskForm.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault();
  validateInputs(taskName, nameFeedback, 5);
  validateInputs(description, desFeedback, 5);
  validateInputs(assignedTo, assignedFeedback, 2);
  validateInputs(dueDate, dateFeedback, 5);
  validateStatus(taskStatus, statusFeedback);

  if (validationFail > 0) {
    validationFail = 0;

    return;
  } else {
    taskManager.addTask(
      taskName.value,
      description.value,
      assignedTo.value,
      dueDate.value,
      taskStatus.value
    );
    clearAll();
    taskManager.save();          /******** new for task 9 ********/
    taskManager.render();
  }

  console.log(taskManager.tasks);
}

const tasksList = document.querySelector("#taskBody");

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    // console.log(event.target.parentElement.parentElement.parentElement);
    // return;
    let parentTask;
    if (event.target.classList.contains("fa-check-circle")) {
      parentTask =
        event.target.parentElement.parentElement.parentElement.parentElement;
    } else {
      parentTask = event.target.parentElement.parentElement.parentElement;
    }

    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getTaskById(taskId);
    task.taskStatus = "Done";

    taskManager.save();

    taskManager.render();
  }

  // Check if a "Delete" button was clicked
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    let parentTask;
    if (event.target.classList.contains("fa-trash-alt")) {
      parentTask =
        event.target.parentElement.parentElement.parentElement.parentElement;
    } else {
        parentTask = event.target.parentElement.parentElement.parentElement;
    }

    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Delete the task
    taskManager.deleteTask(taskId);

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }

  // console.log(event.target);
  if (event.target.classList.contains("task-title")) {
    // console.log("It runs");
    let dropdownActive = event.target.parentElement.parentElement.children[1];
    // console.log(dropdownActive);
    if (dropdownActive.classList.contains("active")) {
      dropdownActive.classList.remove("active");
    } else {
      dropdownActive.classList.add("active");
    }
  }
});