var refresh = document.getElementById("refresh");
refresh.addEventListener("click", function() {
    clearTasks();
});

var plus_task = document.getElementById("add_task");
plus_task.addEventListener("click", () => {
    add_task();
});

Object.keys(localStorage).forEach((key) => {
    taches.insertAdjacentHTML('beforeEnd', localStorage.getItem(key));
    addEvents(localStorage.key(key).split("task_")[1]);

});

show_date();

function add_task() {
    var input_task = document.getElementById('input_task').value.trim();
    if (input_task == "") {
        alert("La tache ne peut etre vide");
    } else {
        var taches = document.getElementById("taches");
        var id = (parseInt(taches.childElementCount) + 1);
        var task_html = create_task_html(id, input_task);

        taches.insertAdjacentHTML('afterbegin', task_html);;
        localStorage.setItem(set_tasks_properties(id), create_task_html(id, input_task));
    }
}

function create_task_id(id) {
    return "task_" + id;
}

function create_task_html(id, value, checked = "") {
    var id_task = create_task_id(id);
    return `
        <div class="tache">
        <input type="checkbox" id="` + id_task + `" name="scales " ` + checked + `>
        <label class="label_task" id="tasklabel_` + id + `" for="` + id_task + `"> ` + value + ` </label>
        <img src="./images/icons8-delete-bin-100.png" class="delete" id="delete` + id + `" alt ="">
        </div>`;
}

function set_tasks_properties(id) {

    var id_task = "task_" + id;
    addEvents(id);
    return id_task;
}

//Si la tache est déjà cochée, décoche 
function checked(id) {

    var element = document.getElementById("task_" + id);
    var label = document.getElementById("tasklabel_" + id);
    var check_attr;
    if (element.checked) {
        element.setAttribute("checked", "");
        check_attr = "checked";
    } else {
        element.removeAttribute("checked");
        check_attr = "";
    }
    if (localStorage.getItem(create_task_id(id)) !== null) {
        localStorage.removeItem(create_task_id(id));
        localStorage.setItem(create_task_id(id), create_task_html(id, label.innerHTML, check_attr));
    }
    label.classList.toggle("check");
}

function delete_task(id) {
    let task = "task_" + id;
    let taches = document.getElementById("taches");
    taches.removeChild(document.getElementById(task).parentElement);
    localStorage.removeItem(task);
    location.reload();
}


function clearTasks() {
    localStorage.clear();
    location.reload();
}

function addEvents(id) {
    document.getElementById("delete" + id).addEventListener("click", () => {
        delete_task(id);
    });
    document.getElementById("task_" + id).addEventListener("click", () => {
        checked(id);
    });
}


function show_date() {

    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    document.getElementById("date").innerText = date.toLocaleDateString('fr-FR', options);

}