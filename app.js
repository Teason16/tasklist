// Define UI Variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM Load
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask)
    //Clear task event
    clearBtn.addEventListener('click', clearTasks)
    //Filter Tasks event
    filter.addEventListener('keyup', filterTasks)
};

//Get tasks for local storage
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task)=>{
        //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    })
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
       alert('Add A Task')
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = '';
    
    e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();   
            //Remve from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach((task, index)=>{
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear Tasks
function clearTasks(e) {
    //slower way
    //taskList.innerHTML = ''

    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    //clear local storage
    clearTasksFromLocalStorage();
}

//Clear task from local storage
function clearTasksFromLocalStorage(e){
    localStorage.clear()
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase() 
    document.querySelectorAll('.collection-item').forEach((task)=> {
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
            task.getElementsByClassName.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}