document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))


    if(storedTasks.forEach){
        storedTasks.forEach((tasks)=> tasks.push)
        updateTasklist()
        updatestats()
         updateFilterButtons();
    }
})
let tasks =[] 
let currentFilter = 'all';

const saveTasks =()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask =()=>{
const taskInput = document.getElementById('taskInput')
const text = taskInput.value.trim();

if (text) {
    tasks.push({ text: text, completed: false});
    taskInput.value ="";
    updateTasklist()
    updatestats()
    saveTasks()
}
};

const updateFilterButtons = () => {
    const allBtn = document.getElementById('showABtn');
    const activeBtn = document.getElementById('showActiveBtn');
    const completedBtn = document.getElementById('showCompletedBtn');

   
    if (allBtn) allBtn.classList.remove('active-filter');
    if (activeBtn) activeBtn.classList.remove('active-filter');
    if (completedBtn) completedBtn.classList.remove('active-filter');

  
    if (currentFilter === 'all' && allBtn) {
        allBtn.classList.add('active-filter');
    } else if (currentFilter === 'active' && activeBtn) {
        activeBtn.classList.add('active-filter');
    } else if (currentFilter === 'completed' && completedBtn) {
        completedBtn.classList.add('active-filter');
    }
};

const ToggleTestComplete=(index)=>{
    tasks[index].completed= !tasks[index].completed;
    updateTasklist()
    updatestats()
    saveTasks()
}
const deleteTask =(index)=>{
    tasks.splice(index, 1)
    updateTasklist()
    updatestats()
     saveTasks()
}
const editTask =(index)=> {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTasklist()
    updatestats()
     saveTasks()
}
const updatestats =() =>{
    const completeTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completeTasks/totalTasks)*100
    const progressBar = document.getElementById('progress' )
    progressBar.style.width =`${progress}% `

    document.getElementById('number').innerText=`${completeTasks} /${totalTasks}`
}
const updateTasklist =()=>{
    const taskList = document.getElementById('task-list')
    taskList.innerHTML =''

    
       
    tasks.forEach((task , index) =>{
         const shouldDisplay =
            (currentFilter === 'all') ||
            (currentFilter === 'active' && !task.completed) ||
            (currentFilter === 'completed' && task.completed);

             if (!shouldDisplay) return;


        const listItem = document.createElement('li')

        listItem.innerHTML = `
    <div class="task-Item">
        <div class="task ${task.completed ? 'completed': ''}">
        <input type ="checkbox" class="checkbox"  ${task.completed ? 'checked': ''} />
        <p> ${task.text}</p>
        </div>
       <div class="icon">
       <img src="./asset/img/edit.png" onclick="editTask (${index}) "/>
       <img src="./asset/img/bin.png"  onclick="deleteTask(${index}) " />
    </div>
    </div>
   
`; 
listItem.addEventListener('change', ()=> ToggleTestComplete(index))
taskList.append(listItem);
    });
   
}
   
document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault()

    addTask();
     
})
document.getElementById('showBtn').addEventListener('click',  () => {
     currentFilter = 'all';
    updateTasklist();
    updateFilterButtons();
})
document.getElementById('showActiveBtn').addEventListener('click',  () => {
      currentFilter = 'active';
    updateTasklist();
    updateFilterButtons();
    
})
document.getElementById('showCompletedBtn').addEventListener('click',  () => {
     currentFilter = 'completed';
    updateTasklist();
    updateFilterButtons();
})




