// Get elements in the DOM
const btnAdd = document.querySelector('.btn-add');
const inputInsert = document.querySelector('[type="text"]');
const list = document.querySelector(".todo-list");
let todos = [];

// Load existing todos from localStorage
let todosLocal = JSON.parse(localStorage.getItem('todos'));
if (Array.isArray(todosLocal)) {
    todos = todosLocal;
    todos.forEach(todo => addItem(todo));  // Loop through and add each todo
}

btnAdd.addEventListener('click', () => {
    const todo = inputInsert.value.trim();
    if (todo) {
        todos.push(todo);  // Add to the todos array
        addItem(todo);     // Add the new todo to the DOM
        inputInsert.value = "";  // Clear the input field
        localStorage.setItem('todos', JSON.stringify(todos));  // Save to localStorage
    }
});

function addItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
        <span class="todo-text">${todo}</span>
        <button class="btn-delete">Delete</button>
    `;
    list.appendChild(li);

    // Add delete functionality to the new todo
    li.querySelector('.btn-delete').addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);  // Remove the todo from the array
        localStorage.setItem('todos', JSON.stringify(todos));  // Update localStorage
        li.remove();  // Remove the item from the DOM
    });
}
