const taskManager = new TaskManager();

// Load the tasks from localStorage     /******** new for task 9 ********/
taskManager.load();
// Render the loaded tasks to the page      /******** new for task 9 ********/

let activeList;
const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
    taskManager.render(activeList);
    taskManager.colorPattern();
  }
});

deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    task: [],
  };
}

function saveAndRender() {
  saveList();
  renderList();
}

function saveList() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function renderList() {
  const myList = document.querySelector("#myList");
  clearElement(listsContainer);
  clearElement(myList);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    myList.add(new Option(list.name, list.id));
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
      activeList = list.id;
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

renderList();
taskManager.render(activeList);
taskManager.colorPattern();

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
const listId = document.querySelector("#myList");

const completed = document.getElementsByClassName("Completed");

let validationFail = 0;

//Check if the Task Name input value is more than 5 characters.

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
      taskStatus.value,
      listId.value
    );
    clearAll();
    taskManager.render(activeList);
    taskManager.colorPattern();
    taskManager.save(); /******** new for task 9 ********/
  }

  // console.log(taskManager.tasks);
}

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

//Cheking that the date input only allows present and future dates
let dateTime = new Date();
let day = dateTime.getDate();
let month = dateTime.getMonth() + 1;
let year = dateTime.getFullYear();

if (day < 10) {
  day = "0" + day;
}

if (month < 10) {
  month = "0" + month;
}

minDate = year + "-" + month + "-" + day;

document.querySelector("#due-date").setAttribute("min", minDate);
console.log(minDate);

taskForm.addEventListener("reset", clearAll);
taskForm.addEventListener("submit", validate);

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
    task.taskStatus = "Completed";
    taskManager.render(activeList);
    taskManager.colorPattern();
    taskManager.save();
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
    // Render the tasks
    taskManager.render(activeList);
    taskManager.colorPattern();
    // Save the tasks to localStorage
    taskManager.save();
  }

  if (
    event.target.classList.contains("fa-caret-down") ||
    event.target.classList.contains("task-title")
  ) {
    let dropdownActive;
    console.log("This code runs");
    if (event.target.classList.contains("task-title")) {
      dropdownActive = event.target.parentElement.parentElement.children[1];
      console.log("It runs also");
    } else {
      dropdownActive =
        event.target.parentElement.parentElement.parentElement.parentElement
          .children[1];
      console.log("It runs here");
    }

    if (dropdownActive.classList.contains("active")) {
      dropdownActive.classList.remove("active");
    } else {
      dropdownActive.classList.add("active");
    }
  }
});

const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark",
};

const theme =
  localStorage.getItem("theme") ||
  ((tmp = Object.keys(themeMap)[0]), localStorage.setItem("theme", tmp), tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);
console.log(bodyClass);

function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}

document.getElementById("themeButton").onclick = toggleTheme;

// link the form to the list with an id - if the user add a list it sould pass id and name to option value in the form container

// Adding task 6th parameter - save in local storage
//the render should get pass a parameter to know what active list id is
//task manager render fucntion inside the for loop, it sould only run if the taks list ID id is equal to the one active
