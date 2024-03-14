let create = document.getElementById('create');
let todoList = document.getElementById('todoList');

let todo = [];

if (localStorage.getItem ('tasks')!=null){
    todo=JSON.parse(localStorage.getItem('tasks'))
    displayData(); 

}

create.addEventListener('keypress', function(event) {
    // Check if the pressed key is 'Enter' (key code 13)
    if (event.keyCode === 13 || event.which === 13) {
        if (create.value === '') {
            alert('You must write something!');
        } else {
            let tasks = {
                id: Date.now(),
                task: create.value,
                completed: false
            };
            todo.push(tasks);
            localStorage.setItem('tasks', JSON.stringify(todo));
            console.log(todo);
            displayData(); 
            clearData();
        }
    }
});


function addTask() {
    if (create.value === '') {
        alert('You must write something!');
    } else {
        let task = { // Rename variable to task instead of tasks
            id: Date.now(),
            task: create.value,
            completed: false
        };
        todo.push(task); // Push the task into the todo array
        localStorage.setItem('tasks', JSON.stringify(todo));
        console.log(todo);
        displayData(); 
        clearData();
    }
}


function displayData() {
    let data = '';
    for (let i = 0; i < todo.length; i++) {
        data += `<div> <p><input class="checkbox" type="checkbox"> ${todo[i].task} </p></div>`;
    }
    todoList.innerHTML = data;
}
function clearData(){
    create.value=``
}


//Delete Tasks

function deleteData(){
    todo.length=0; 
    localStorage.setItem('tasks', JSON.stringify(todo)); // Update localStorage
    displayData(); // Update the U
}
// todoList.addEventListener('contextmenu',function(index){
//     index.preventDefault();
//     console.log(index);
//     todo.splice(index,1)
//     localStorage.setItem('tasks',JSON.stringify(todo))
//     displayData();
// })

// todoList.addEventListener('contextmenu', function(event) {
//     event.preventDefault(); // Prevent default context menu behavior

//     // Here you need to determine which task was right-clicked and then delete it
//     // You can use event.target to get the clicked element, and then traverse the DOM to find the corresponding task
//     let taskId = event.target.closest('div').id;
//     let taskIndex = todo.findIndex(item => item.id == taskId);

//     // Check if the task was found in the array
//     if (taskIndex !== 0) {
//         todo.splice(taskIndex, 1); // Remove the task from the array
//         localStorage.setItem('tasks', JSON.stringify(todo)); // Update localStorage
//         displayData(); // Update the UI
//     }
// });
todoList.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Prevent default context menu behavior

    // Find the parent task element (closest div with an id)
    let taskElement = event.target.closest('div[id]');
    
    // Check if a task element was found
    if (taskElement) {
        // Extract the task id from the task element's id attribute
        let taskId = taskElement.id;

        // Find the index of the task in the todo array
        let taskIndex = todo.findIndex(item => item.id == taskId);

        // Check if the task was found in the array
        if (taskIndex !== 0) {
            todo.splice(taskIndex, 1); // Remove the task from the array
            localStorage.setItem('tasks', JSON.stringify(todo)); // Update localStorage
            displayData(); // Update the UI
        }
    }
});




todoList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        let itemId = event.target.parentNode.parentNode.id;
        let item = todo.find(item => item.id == itemId);
        if (event.target.checked) {
            event.target.parentNode.style.textDecoration = "line-through";
            item.completed = true;
        } else {
            event.target.parentNode.style.textDecoration = "none";
            item.completed = false;
        }
        localStorage.setItem('tasks', JSON.stringify(todo));
    }
});


