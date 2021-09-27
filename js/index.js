const taskManager = new TaskManager();

//Selecting Id to validate input on the form
const taskName = document.querySelector("#task-name");
const description = document.querySelector("#description");
const assignedTo = document.querySelector("#assigned-to");
const dueDate = document.querySelector("#due-date");
const taskStatus = document.querySelector("#taskStatus");
const taskForm = document.querySelector("#taskForm");
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

taskForm.addEventListener("submit", validate);
// taskForm.addEventListener("clear", clearForm);

function validate(event) {
  event.preventDefault();
  validateInputs(taskName, nameFeedback, 5);
  validateInputs(description, desFeedback, 5);
  validateInputs(assignedTo, assignedFeedback, 2);
  validateInputs(dueDate, dateFeedback, 5);
  validateStatus(taskStatus, statusFeedback);

  const clearForm = () => {
    taskName.value = "";
    description.value = "";
    assignedTo.value = "";
    dueDate.value = "";
    taskStatus.value = "0";
    taskName.classList.remove("validated-field");
    taskName.classList.remove("validated-feedback");
    description.classList.remove("validated-field");
    description.classList.remove("validated-feedback");
    assignedTo.classList.remove("validated-field");
    assignedTo.classList.remove("validated-feedback");
    dueDate.classList.remove("validated-field");
    dueDate.classList.remove("validated-feedback");
    taskStatus.classList.remove("validated-field");
    taskStatus.classList.remove("validated-feedback");
  };

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
    clearForm();
    taskManager.render();
  }

  console.log(taskManager.tasks);
}
