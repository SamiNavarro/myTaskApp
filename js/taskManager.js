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
}

// let taskList = new TaskManager();

// console.log(taskList);

// taskList.addTask("sprint 1", "Creat a class" , "Sami Phil", "26/09/21", "Pending");

// taskList.addTask("sprint 2", "Creat a array" , "Sami & Phil", "29/09/21", "Pending");

// console.log(taskList.tasks);
