// Model - everything that manages data 

let todos;

// if localstorage has a todos array, then use it. 
// Otherwise, use the default array.

// How to check local storage? Retrieve local storage using key & convert it back to an array since we stringified it previously.

const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
        title: 'Get groceries',
        id: 'id1'
    },
    {
        title: 'Meal prep',
        id: 'id2'
    },
    {
        title: 'Make dinner',
        id: 'id3'
    }];
}

function createTodo(title) {
    const id = new Date().getTime();

    todos.push({
        title: title,
        id: id
    });

    saveTodos();
}

function removeTodo(idToDelete) {
    todos = todos.filter(function (todo) {
        // if the ID of this todo matches idToDelete, then return false
        // For everything else, return true
        // use == because one will be a string and one will be a number (on the new tasks added)
        if (todo.id == idToDelete) {
            return false;
        } else {
            return true;
        }
    });

    saveTodos();
}

// local storage only saves strings
// must convert array into a string (json.stringify) & pass in array
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

render();

// View - Renders visuals using data in the models

function render() {
    // reset our list to be empty and re-render our list
    document.getElementById('todo-list').innerHTML = '';

    // re-renders updated list
    todos.forEach(function (todo) {
        // Creating & appending element
        const element = document.createElement('div');
        element.innerText = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'margin-left: 12px; margin-bottom: 7px; margin-top: 7px;';
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id;
        element.appendChild(deleteButton);

        const todoList = document.getElementById('todo-list');
        todoList.appendChild(element);
    })
};


// Controller - only code that deals with the button click/interaction
// minimum amount of code we need to update the model & view

function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    createTodo(title);
    render();
};

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id

    removeTodo(idToDelete);
    render();
}
