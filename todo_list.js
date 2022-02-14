const taskList = document.querySelector('#task_list');
const addTaskButton = document.querySelector('#add_task');

let descriptionInput = document.querySelector('#task_description_input');
let dateInput = document.querySelector('#duedate_input');
let timeInput = document.querySelector('#duetime_input');
let doneButton = document.querySelectorAll('.done');

function addTask(description, dueTime){
    let addItem = document.createElement("li");
    if (dueTime) {
        
        dueTime = new Date(dueTime);
        //console.log('dueTime =', dueTime);
        formattedDueTime = dueTime.toLocaleString('en-US', {timeZone: "EST"}).replace(',', '');
        console.log('formatted duetime = ', formattedDueTime);

        addItem.innerHTML = `
        ${description}<span class="due">due ${formattedDueTime}</span><button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }
    else{
        addItem.innerHTML = `${description}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button>`;
    }
    taskList.append(addItem);
    doneButton = document.querySelectorAll('.done');
    console.log('new buttons', doneButton);
    waitToRemoveList();
}



//test input
addTask('do something');
addTask('buy fruits', 1639944400000);



function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTaskWithFormat(){
    let convertedDue = dateAndTimeToTimestamp(dateInput, timeInput);
    console.log('timeinput =', convertedDue);
    addTask(descriptionInput.value, convertedDue);
    descriptionInput.value = '';
    timeInput.value = '';
    dateInput.value = '';
}

addTaskButton.addEventListener('click', () => {
    console.log('button clicked');
    console.log('date is ', dateInput.value);
    console.log('time is ', timeInput.value);
    addTaskWithFormat();
})

descriptionInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        console.log('enter pressed');
        addTaskWithFormat();
    }
})

function waitToRemoveList(){
    doneButton[doneButton.length - 1].addEventListener('click', (e) => {
            console.log('done clicked');
            console.log('e.target', e.target.parentElement);
            e.target.parentElement.remove();
        })
    };
