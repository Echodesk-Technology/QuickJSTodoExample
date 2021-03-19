import Quick from "quickjs-component"


export default function TodoList(todo) {
    return (
        <div className="todos-con w-11/12 block ml-auto mr-auto">
            <div className="mt-20 todos-main flex items-center justify-center">
                <input id="todoInput" type="text" placeholder="New Todo" className="bg-gray-200 w-full p-2 rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-600" />
                <button id="addTodoBtn" className="bg-yellow-600 text-white rounded-sm w-40 ml-5 p-2 focus:outline-none">Add Todo</button>
            </div>

            <div className="todos-list">
                <ul id="todos-list-con">
                </ul>
            </div>
        </div>
    )
}


function setTodo() {
    const todoInput = document.getElementById("todoInput");
    todoInput.addEventListener("keyup", (e) => {
        if(e.key === "Enter") {
            if (todoInput.value !== "") {
                addTodo(todoInput.value)
            }
            todoInput.value = ""
        }
    })
    const addTodoBtn = document.getElementById("addTodoBtn");
    addTodoBtn.addEventListener("click", (e) => {
        if (todoInput.value !== "") {
            addTodo(todoInput.value)
        }
        todoInput.value = ""
    });

}

function addTodo(todo) {
    const todosContainer = document.getElementById("todos-list-con");
    todosContainer.addEventListener("click", completeOrDeleteTodo)
    const todoElement = document.createElement("li");
    todoElement.innerHTML = `
        <span>${todo}</span>
        <div class="flex">
        <button name="completeTodo" class="outline-none focus:outline-none">
            <svg name="completeTodo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" name="completeTodo"/>
        </svg>
        </button>

        <button name="deleteTodo" class="w-8 ml-6 outline-none focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 cursor-pointer" name="deleteTodo">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
        </button>
    </div>
        `
    todoElement.classList.add("flex", "justify-between", "bg-gray-100", "mt-5", "p-2", "border-b", "border-yellow-600", "w-full");
    todosContainer.appendChild(todoElement);
}

function completeOrDeleteTodo(e) {
    if (e.target.tagName === "svg") {
        if (e.target.parentElement.name === "completeTodo") {
            let todo = e.target.parentElement.parentElement.parentElement.children[0];
            if (todo.style.textDecoration === "line-through") {
                todo.style.textDecoration = "none"
            }
            else {
                todo.style.textDecoration = "line-through"
            }
        }
        if (e.target.parentElement.name === "deleteTodo") {
            let todo = e.target.parentElement.parentElement.parentElement;
            todo.remove();
        }
    }
    if (e.target.tagName === "path") {
        if (e.target.parentElement.parentElement.name === "completeTodo") {
            let todo = e.target.parentElement.parentElement.parentElement.parentElement.children[0];
            if (todo.style.textDecoration === "line-through") {
                todo.style.textDecoration = "none"
            }
            else {
                todo.style.textDecoration = "line-through"
            }
        }
        if (e.target.parentElement.parentElement.name === "deleteTodo") {
            let todo = e.target.parentElement.parentElement.parentElement.parentElement;
            todo.remove();
        }
    }
}


Quick.componentLoaded(setTodo);