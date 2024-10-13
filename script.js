const newTaskInput =  document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks , editTasks , tasks ; 
let UpdateNote = "";
let count;

window.onload=()=>{
    UpdateNote = "";
    count=Object.keys(localStorage).length;
    displayTasks();
};


const displayTasks=()=>{
    if (Object.keys(localStorage).length>0) {
        tasksDiv.style.display = "inline-block";

    }
    else{
        tasksDiv.style.display="none";
    }

    tasksDiv.innerHTML="";


    let tasks = Object.keys(localStorage);
    tasks=tasks.sort();

    for(let key of tasks){
        let classValue = "";


        let value=localStorage.getItem(key);
        let taskInnerDiv= document.createElement("div");
        taskInnerDiv.classList.add("task");
        taskInnerDiv.setAttribute("id",key);
        taskInnerDiv.innerHTML=`<span id="taskname">${key.split("_")[1]} </span>`;
    


    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML= `<i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></i>`;

    if (!JSON.parse(value)) {
        editButton.style.visibility="visible"   ;     
    }
    else{
        editButton.style.visibility="hidden"   ;     
        taskInnerDiv.classList.add("completed");
    }

    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-trash" style="color: #000000;"></i></button>`;
    tasksDiv.appendChild(taskInnerDiv);


    }

tasks = document.querySelectorAll(".task");
tasks.forEach((element,index) => {
    element.onclick=()=>{

        if (element.classList.contains("completed")) {
            updateStorage(element.id.split("_")[0],
        element.innerText,false);
        }
        else{
            updateStorage(element.id.split("_")[0],
            element.innerText,true);
        }
    };
});

        editTasks = document.getElementsByClassName("edit");
        Array.from(editTasks).forEach((element,index) => {
            element.addEventListener("click", (e) => {

                e.stopPropagation();

                disableButtons(true);

                let parent = element.parentElement;
                newTaskInput.value = parent.querySelector("#taskname").innerText;

                UpdateNote=parent.id;

                parent.remove();
            });
        });

        deleteTasks = document.getElementsByClassName("delete");
        Array.from(deleteTasks).forEach((element,index) => {
            element.addEventListener("click", (e) => {
                e.stopPropagation();

                let parent = element.parentElement ;
                removeTask(parent.id);
                parent.remove();
                count -= 1;
            });
        });

};

const disableButtons = (bool) =>{
    let editButtons=document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element)=> {element.disabled=bool});

};

const removeTask = (taskValue) =>{
        localStorage.removeItem(taskValue);
        displayTasks();
};

const updateStorage = (index,taskValue,completed) => {
    localStorage.setItem(`${index}_${taskValue}`
        ,completed);
    displayTasks();

};

document.querySelector("#push").addEventListener("click",()=>{
    disableButtons(false);

    if (newTaskInput.value.length==0) {
        alert("please Enter A task")
    }
    else{
        if (UpdateNote == "") {
            updateStorage(count,newTaskInput.value,false);
        }
        else{
            let existingCount = UpdateNote.split("_")[0];
            removeTask(UpdateNote);
            updateStorage(existingCount,newTaskInput.value,false);
            UpdateNote="";
        }
        count +=1;
        newTaskInput.value="";
    }
});