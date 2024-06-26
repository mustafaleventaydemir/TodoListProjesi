const form = document.querySelector("#todoAddForm");
//console.log(form);
const addInput = document.querySelector("#todoName");
//console.log(addInput);
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodos);
    filterInput.addEventListener("keyup", filter);
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "displat : block");
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    } else {
        showAlert("warning", "Filtre yapmak için en az bir todo olmalı!");
    }
}

function removeAllTodos() {
    const removeTodoList = document.querySelectorAll(".list-group-item");
    if (removeTodoList.length > 0) {
        //console.log(removeTodoList);
        removeTodoList.forEach(function (todo) {
            todo.remove();
        })

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("dark", "Todolarınız başarıyla silindi.");
    } else {
        showAlert("danger", "Todonuz bulunmamaktadır.");
    }
}

function removeTodoToUI(e) {
    // console.log(e.target);
    //Ekrandan Silme
    if (e.target.className === "fa fa-remove") {
        const removeTodo = e.target.parentElement.parentElement;
        removeTodo.remove();

        //LocalStorage silme
        removeTodoToStorage(removeTodo.textContent);
        showAlert("info", "Todo Silindi.");
    }
}

function removeTodoToStorage(reTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (reTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
        // console.log(todo);
    });
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "Lütfen Boş Bırakmayınız.");
    } else {
        //arayüze ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {

    /*<li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>*/
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    //div.className = 'alert alert -& { type }'; //literal template
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2500);
}