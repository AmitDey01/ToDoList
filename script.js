let form = document.getElementById("form"),
  titleInput = document.getElementById("titleInput"),
  msg = document.getElementById("msg"),
  dateInput = document.getElementById("dateInput"),
  textareaInput = document.getElementById("textareaInput"),
  todoStatus = document.getElementById("status"),
  tasks = document.getElementById("tasks"),
  tasks2 = document.getElementById("tasks2"),
  addBtn = document.getElementById("addBtn");

//prevent dafault behavior
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//form validation

let formValidation = () => {
  if (titleInput.value === "") {
    console.log("faliure state");
    msg.innerHTML = "Input cannot be blank";
  } else {
    console.log("Success state");
    msg.innerHTML = "";
    acceptData();
    //call inside success state
    addBtn.setAttribute("data-bs-dismiss", "modal");
    //to avoid double click to submiting the form we create fake form
    addBtn.click();
    //to avoid unnessery form submiting for
    (() => {
      addBtn.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//Emptyobject to store data

// let data = {};

//lets crete set of object and store in a array

let data = [];

//accept the data
let acceptData = () => {
  data.push({
    title: titleInput.value,
    date: dateInput.value,
    description: textareaInput.value,
    status: todoStatus.value,
  });

  //push data to localStorage
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTask();
  // completeTask();
};

// //store the data

let createTask = () => {
  //avoid to same task again
  tasks.innerHTML = "";
  data.map((x, y) => {
    if (x.status === "ongoing") {
      console.log("ongoing");
      return (tasks.innerHTML += `
        <div id=${y}>
        <h3>${x.title}</h3>
        <p>${x.date}</p>
        <p>${x.description}</p>
        <span>${x.status}</span>
        <span class="options">
            <i data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="fas fa-edit"></i>
            <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
        </span>
        </div>`);
    } else {
      console.log("completed");
      return (tasks2.innerHTML += `
          <div id=${y}>
          <h3>${x.title}</h3>
          <p>${x.date}</p>
          <p>${x.description}</p>
          <span>${x.status}</span>
          <span class="options">
              <i data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="fas fa-edit"></i>
              <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
          </span>
          </div>`); 
    }
  });

  resetForm();
};

//Reset the Form

let resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  textareaInput.value = "";
  todoStatus.value = "";
};

// //retreive data from local Storage
(() => {
  data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  //to display localstorage data call createTask function
  createTask();
})();

// //Delete todo  from list
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();

  console.log(e.parentElement.parentElement.id);

  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

// //Edit todo form list

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  titleInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textareaInput.value = selectedTask.children[2].innerHTML;
  todoStatus.value = selectedTask.children[3].innerHTML;
  //   selectedTask.remove();

  deleteTask(e);
};

//complete the task

// let completeTask = () => {
//   tasks2.innerHTML = "new post created";
// };
