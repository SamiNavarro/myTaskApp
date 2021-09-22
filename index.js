//Selecting Id to validate input on the form
const taskName = document.querySelector("#task-name");
const feedback = document.querySelector("#description");
const assignedTo = document.querySelector("#assigned-to");
const dueDate = document.querySelector("#due-date");
const taskStatus = document.querySelector("#taskStatus");
const taskForm = document.querySelector("#taskForm");
const nameFeedback = document.querySelector("#nameFeedback");
const desFeedback = document.querySelector("#desFeedback");
const dateFeedback = document.querySelector("#dateFeedback");
const statusFeedback = document.querySelector("#statusFeedback");

//Check if the Task Name input value is more than 5 characters.

taskForm.addEventListener("submit", validate);

function validate(event) {
  event.preventDefault();

  if (taskName.value.trim().length > 5) {
    nameFeedback.innerHTML = "Looks good!";
    nameFeedback.classList.add("validated-feedback");
    nameFeedback.classList.remove("not-validated-feedback");
    taskName.classList.add("validated-field");
    taskName.classList.remove("not-validated-field");
  } else {
    nameFeedback.innerHTML = "Please add a name!";
    nameFeedback.classList.add("not-validated-feedback");
    nameFeedback.classList.remove("validated-feedback");
    taskName.classList.add("not-validated-field");
    taskName.classList.remove("validated-field");
  }

  if (description.value.length > 5) {
    desFeedback.innerHTML = "Looks good!";
    desFeedback.classList.add("validated-feedback");
    desFeedback.classList.remove("not-validated-feedback");
    description.classList.add("validated-field");
    description.classList.remove("not-validated-field");
  } else {
    desFeedback.innerHTML = "Please add a description!";
    desFeedback.classList.add("not-validated-feedback");
    desFeedback.classList.remove("validated-feedback");
    description.classList.add("not-validated-field");
    description.classList.remove("validated-field");
  }

  if (assignedTo.value.length >= 2) {
    assignedFeedback.innerHTML = "Looks good!";
    assignedFeedback.classList.add("validated-feedback");
    assignedFeedback.classList.remove("not-validated-feedback");
    assignedTo.classList.add("validated-field");
    assignedTo.classList.remove("not-validated-field");
  } else {
    assignedFeedback.innerHTML = "Please assign someone!";
    assignedFeedback.classList.add("not-validated-feedback");
    assignedFeedback.classList.remove("validated-feedback");
    assignedTo.classList.add("not-validated-field");
    assignedTo.classList.remove("validated-field");
  }

  if (dueDate.value) {
    dateFeedback.innerHTML = "Looks good!";
    dateFeedback.classList.add("validated-feedback");
    dateFeedback.classList.remove("not-validated-feedback");
    dueDate.classList.add("validated-field");
    dueDate.classList.remove("not-validated-field");
  } else {
    dateFeedback.innerHTML = "Please add a date!";
    dateFeedback.classList.add("not-validated-feedback");
    dateFeedback.classList.remove("validated-feedback");
    dueDate.classList.add("not-validated-feedback");
    dueDate.classList.remove("validated-feedback");
  }

  if (taskStatus.value) {
    statusFeedback.innerHTML = "Looks good!";
    statusFeedback.classList.add("validated-feedback");
    statusFeedback.classList.remove("not-validated-feedback");
    taskStatus.classList.add("validated-field");
    taskStatus.classList.remove("not-validated-field");
  } else {
    statusFeedback.innerHTML = "Please add a status!";
    statusFeedback.classList.add("not-validated-feedback");
    statusFeedback.classList.remove("validated-feedback");
    taskStatus.classList.add("not-validated-field");
    taskStatus.classList.remove("validated-field");
  }

  //   console.log(dueDateValidate.value);
  //   console.log(statusValidate.value);
}
