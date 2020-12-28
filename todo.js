const toDoForm =document.querySelector(".js-toDoForm"),
toDoInput =toDoForm.querySelector("input"),
toDoList= document.querySelector(".js-toDoList");
fsList=document.querySelector(".js-finishList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pdToDos = [];
let fsToDos = [];


function saveToDos(listName) {
    console.log(listName);
    if (listName === PENDING_LS) {
      localStorage.setItem(PENDING_LS, JSON.stringify(pdToDos));
    } else {
      localStorage.setItem(FINISHED_LS, JSON.stringify(fsToDos));
    }
  }
  function pendingDeleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = pdToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    pdToDos = cleanToDos;
    saveToDos(PENDING_LS);
  }
  
  function finishedDeleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    fsList.removeChild(li);
    const cleanToDos = pdToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    fsToDos = cleanToDos;
    saveToDos(FINISHED_LS);
  }
  function checkToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const finishToDos = pdToDos.filter(function (toDo) {
      if (toDo.id === parseInt(li.id)) {
        finishedPaintToDo(toDo.text);
      }
      return toDo.id !== parseInt(li.id);
    });
    console.log(finishToDos);
    pdToDos = finishToDos;
    saveToDos(PENDING_LS);
  }
  function backToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    fsList.removeChild(li);
    const pendingToDos = fsToDos.filter(function (toDo) {
      if (toDo.id === parseInt(li.id)) {
        pendingPaintToDo(toDo.text);
      }
      return toDo.id !== parseInt(li.id);
    });
    console.log(pendingToDos);
    fsToDos = pendingToDos;
    saveToDos(FINISHED_LS);
  }
  
  function finishedPaintToDo(text) {
    const li = document.createElement("li");
    const backBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = fsToDos.length + 1;
    span.innerText = text;
    finishBtn.innerText = "✖";
    finishBtn.addEventListener("click", finishedDeleteTodo);
    backBtn.innerText = "◀";
    backBtn.addEventListener("click", backToDo);
    li.appendChild(span);
    li.appendChild(finishBtn);
    li.appendChild(backBtn);
    fsList.appendChild(li);
    li.id = newId;
    const toDoObj = {
      text: text,
      id: newId
    };
    fsToDos.push(toDoObj);
    saveToDos(FINISHED_LS);
  }
  function pendingPaintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = pdToDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", pendingDeleteTodo);
    checkBtn.innerText = "✔";
    checkBtn.addEventListener("click", checkToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
      text: text,
      id: newId
    };
    pdToDos.push(toDoObj);
    saveToDos(PENDING_LS);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const currenValue = toDoInput.value;
    console.log(currenValue);
    pendingPaintToDo(currenValue);
    toDoInput.value = "";
  }
  
  function pendingToDos() {
    const pendingToDos = localStorage.getItem(PENDING_LS);
    if (pendingToDos !== null) {
      const parsedToDos = JSON.parse(pendingToDos);
      parsedToDos.forEach(function (toDo) {
        pendingPaintToDo(toDo.text);
      });
    }
  }
  
  function finishedToDos() {
    const finishedToDos = localStorage.getItem(FINISHED_LS);
    if (finishedToDos !== null) {
      const parsedToDos = JSON.parse(finishedToDos);
      parsedToDos.forEach(function (toDo) {
        finishedPaintToDo(toDo.text);
      });
    }
  }
  
  function init() {
    pendingToDos();
    finishedToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }
  
  init();
  