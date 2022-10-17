let monthNames = ['Enero', 'Febrero', 'Marzo', 'April', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
let weekday = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let prevMonthDOM = gi('prev-month');
let nextMonthDOM = gi('next-month');
let contenedor = gi("contenedorPrincipal");

let month = gi('month');
let year = gi('year');
let workCounter = 0;


function startWeek(){
    let d = new Date();
    let diaActual = d.getDay();
    let fechaActual = currentYear + "-" 
        + String(monthNumber + 1).padStart(2,'0') + "-" 
        + String(currentDay).padStart(2,'0');
    //console.log("La fecha actual es :" + fechaActual);
    let s = 1;
    
    for(let x = 0; x < weekday.length; x++){
        let counterFilterDB = 0;
        if(diaActual == 0){
            let idDay = "days_" + (diaActual + x) ;
            let day = gi(idDay);
            day.innerHTML += currentDay + x;
            fechaActual = currentYear + "-" 
            + String(monthNumber + 1).padStart(2,'0') + "-" 
            + String(currentDay + x).padStart(2,'0');
            mostrar(fechaActual, counterFilterDB, x);
        }else{
            if((diaActual + x) >= 7 && x != 7){
                let idDay = "days_" + (diaActual - s) ;
                let day = gi(idDay);
                day.innerHTML += currentDay - s;
                s++;
            }else{
                let idDay = "days_" + (diaActual + x) ;
                let day = gi(idDay);
                day.innerHTML += currentDay + x; 
            }
        }
        //if(workCounter < (x+1)){
        //    let blankSpace = gi(x);
        //    blankSpace.innerHTML += `<div class="task"></div>`; 
        //}
    }
}

startWeek();

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());

const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
}

const breakTask = gi('break');
const gymTask = gi('gym');
const studyTask = gi('study');
const tvTask = gi('tv');
const friendsTask = gi('friends');
const workTask = gi('work');
const deselectBtn = gi('deselect');

let selectedColor, active;

//Event Listeners
taskContainer.addEventListener('click', selectTask);
scheduleContainer.addEventListener('click', setColors);
deselectBtn.addEventListener('click', resetTasks);
resetBtn.addEventListener('click',openPopup);
noBtn.addEventListener('click', closePopup);
yesBtn.addEventListener('click', deleteTasks);

// Tasks click  (3)
function selectTask (e){
    resetTasks()

    taskColor = e.target.style.backgroundColor;

    switch(e.target.id){
        case 'break':
            activeTask(breakTask, taskColor);
            icon = '<i class="fas fa-couch"></i>';
            break
        case 'gym':
            activeTask(gymTask, taskColor);
            icon = '<i class="fas fa-dumbbell"></i>';
            break
        case 'study':
            activeTask(studyTask, taskColor);
            icon = '<i class="fas fa-book"></i>';
            break
        case 'tv':
            activeTask(tvTask, taskColor);
            icon = '<i class="fas fa-tv"></i>';
            break
        case 'friends':
            activeTask(friendsTask, taskColor);
            icon = '<i class="fas fa-users"></i>';
            break
        case 'work':
            activeTask(workTask, taskColor);
            icon = '<i class="fas fa-briefcase"></i>';
            break
    }

};

// Set colors for schedule (4)
function setColors (e){
    if(e.target.classList.contains('task') && active === true){
        e.target.style.backgroundColor = selectedColor;
        e.target.innerHTML = icon;
    }else if(e.target.classList.contains('fas') && active === true){
        e.target.parentElement.style.backgroundColor = selectedColor;
        e.target.parentElement.innerHTML = icon;
    }
};

// Active task (1)
function activeTask(task, color){
    task.classList.toggle('selected');

    if(task.classList.contains('selected')){
        active = true;
        selectedColor = color;
        return selectedColor;
    } else {
        active = false;
    }
}

// Reset tasks (2)
function resetTasks(){
    const allTasks = document.querySelectorAll('.task__name');

    allTasks.forEach((item)=>{
        item.className = 'task__name';
    })
}

// Delete tasks
function deleteTasks(){
    const tasks = document.querySelectorAll('.task');

    tasks.forEach((item)=>{
        item.innerHTML = '';
        item.style.backgroundColor = 'white';
    })

    closePopup();
}

// Open Pop-up
function openPopup(){
    popUp.style.display = 'flex';
}

// Close Pop-up
function closePopup(){
    popUp.style.display = 'none';
}

function gi(id){
    return document.getElementById(id);
}

function agregarContacto(){
    gi("trabajo").style.display='inline';
    gi("guardar").style.display='inline';
}

function ocultarForm(){
    gi("txtNombre").value = "";
    gi("txtCantidad").value = "";
    gi("date").value = "";
    gi("trabajo").style.display='none';
    gi("guardar").style.display='none';
}

function guardar(){
    
    db.collection("trabajos").add({
        nombre: document.getElementById("txtNombre").value,
        cantidad: document.getElementById("txtCantidad").value,
        fecha: document.getElementById("date").value
    })
    .then((docRef) => {
        alert("Guardado exitoso");
    })
    .catch((error) => {
        alert("Error al guardar");
    });

    ocultarForm();
}

function mostrar(fechaTrabajo, counterFilterDB, x){
    //console.log("Fecha de la base de datos: " + fechaTrabajo);
    db.collection("trabajos").where("fecha", "==", fechaTrabajo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        let result =  doc.data().nombre + " " + doc.data().cantidad;
        console.log("Resultado: " + result);
        contenedor.innerHTML += `<div class="part__day" id= "${counterFilterDB}"></div>`;
        let work = gi(counterFilterDB);
        if(x == 0){
            work.innerHTML += `<span class="time">Trabajo</span>`;
        } 
        work.innerHTML += `<div class="task">${result}</div>`;
        counterFilterDB++;
        workCounter++;
    });})
        .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function workSapceBuilt(resultFilter, fecha){
    let d = new Date();
    let diaActual = d.getDay();
    let contenedor = gi("contenedorPrincipal");
    contenedor.innerHTML += `<div class="part__day" id= "${counterFilterDB}"></div>`;
    let work = gi(counterFilterDB);
    work.innerHTML += `<span class="time">Trabajo</span>`;
    for(let i = 0; i < 7; i++){
        if(i == diaActual){
            work.innerHTML += `<div class="task">${resultFilter}</div>`;
        }else{
            work.innerHTML += `<div class="task"></div>`;
        }
    }
    
    counterFilterDB++;
}






