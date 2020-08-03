
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Creating variables
let LIST;
let ID;

// get item from local storage
let data = localStorage.getItem("TODO");

// Check to see if variable is empty.
if(data)
{
    LIST = JSON.parse(data);
    ID = LIST.length;       // set the id to the last one in the list
    loadList(LIST);         // load the list to the user interface
}
else       // List is empty.
{
    LIST = [];
    ID = 0;
}

// load the items to the user's interface
function loadList(array)
{
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear the local storage.
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// Showing todays date.
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Adding a to-do function.
function addToDo(toDo, id, done, trash) 
{
    if(trash)
    {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;        // Check to see if task is done.
    const LINE = done ? LINE_THROUGH : "";      

    // Creating the item with our variables. 
    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li> 
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


// --------------------       ADDING ITEMS WHEN ENTER IS PRESSED      -----------------------
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13)
    {
        const toDo = input.value;

        // Checking to see if input is empty
        if(toDo)
        {
            addToDo(toDo, ID, false, false);

            LIST.push({            // Push the new to-do to the list.
                name: toDo,
                id: ID,
                done: false,
                trash: false
            });

            // add item to local storage (put everywhere we update list)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            ID++;
        }

        input.value = "";
    }
});


//------------------------  CHECKs THE CIRCLE ON/OFF        ---------------------------------    
function completeToDo(element)
{
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


//---------------------     REMOVES ITEMS USER INPUT        ---------------------------------
function removeToDo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


//---------------------     CHECKING FOR USER INPUT ON COMPLETE/DELETE      -----------------
list.addEventListener("click", function(event) {
    const element = event.target;       // Returns the clicked element in list.
    const elementJob = element.attributes.job.value;        // Complete or delete?

    if(elementJob == "complete")
    {
        completeToDo(element);
    }
    else if(elementJob == "delete")
    {
        removeToDo(element);
    }

    // add item to local storage (put everywhere we update list)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

