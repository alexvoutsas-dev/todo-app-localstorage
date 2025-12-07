const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");

// θα κρατάμε τις δουλειές εδώ
let tasks = [];

// ΦΟΡΤΩΝΟΥΜΕ ΑΠΟ localStorage ΟΤΑΝ ΑΝΟΙΓΕΙ Η ΣΕΛΙΔΑ
window.addEventListener("load", () => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved); // γυρνάει σε array
        tasks.forEach(task => {
            createTaskElement(task.text, task.done);
        });
    }
});

// ΒΟΗΘΗΤΙΚΗ ΣΥΝΑΡΤΗΣΗ: ΦΤΙΑΧΝΕΙ ΕΝΑ <li> ΓΙΑ ΕΝΑ TASK
function createTaskElement(text, done = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (done) {
        li.style.textDecoration = "line-through";
    }

    li.addEventListener("click", () => {
        // εναλλαγή done / not done
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
            updateTask(text, false);
        } else {
            li.style.textDecoration = "line-through";
            updateTask(text, true);
        }
        saveTasks();
    });

    list.appendChild(li);
}

// ΣΩΖΕΙ ΤΟ tasks array ΣΤΟ localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ΕΝΗΜΕΡΩΝΕΙ ΕΝΑ TASK ΣΤΟ ARRAY (done true/false)
function updateTask(text, done) {
    tasks = tasks.map(task =>
        task.text === text ? { ...task, done } : task
    );
}

// ΠΡΟΣΘΗΚΗ ΤASK
addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText === "") {
        input.style.border = "2px solid red";
        setTimeout(() => {
            input.style.border = "";
        }, 1000);
        return;
    }

    // προσθέτουμε στο array
    tasks.push({ text: taskText, done: false });
    saveTasks();

    // φτιάχνουμε το li
    createTaskElement(taskText, false);

    input.value = "";
});

// CLEAR ALL ΤΑ ΠΑΝΤΑ
clearAll.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    list.innerHTML = "";
});


