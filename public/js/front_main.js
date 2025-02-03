let selected = 0;
window.addEventListener("load", () => {
    // init filters
    let filters = document.getElementById("filters").children;
    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener("click", () => {
            selected = i;
            updateFilters(filters);
        });
    }
    updateFilters(filters); // update filters on website load

    // init create button
    const create_button = document.getElementById("add_button");
    create_button.addEventListener("click", () => {
        document.location.href = "/create";
    })

    // init tasks
    let tasks = document.getElementsByClassName("task");
    if (tasks.length === 0) {
        let h1 = document.createElement("h1");
        h1.innerHTML = "No Tasks :(";
        h1.classList.add("message");
        document.getElementById("content").appendChild(h1);
    }
    else {
        for (let task of tasks) { // for each task
            assignButtons(task); // assign its buttons and connect them to the backend
            refreshTask(task); //
        }
    }
});

/**
 * updates the filter buttons at the top based on the filter selected
 * @param filters list of the filters
 */
function updateFilters(filters) {
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("selected");
        filters[i].classList.add("unselected");
    }
    filters[selected].classList.remove("unselected");
    filters[selected].classList.add("selected");
    filterTasks(selected);
}

/**
 * Dynamically hides or unhides tasks from the page based on the passed in filter
 * @param filter which id to filter tasks by
 */
async function filterTasks(filter) {
    let tasks = document.getElementsByClassName("task");
    for (let task of tasks) {
        let ID = Number(task.getAttribute("data-id"));
        let DONE = Number(task.getAttribute("data-done")); // 0 if no, 1 if yes
        let STARRED = Number(task.getAttribute("data-star")); // 0 if no, 1 if yes
        let DELETED = Number(task.getAttribute("data-deleted")); // 0 if no, 1 if yes
        if (filter === 0) { // all, excluding deleted
            if (DELETED === 1) {
                setInvisible(task);
            }
            else {
                setVisible(task);
            }
        }
        else if (filter === 1) { // in progress, excluding deleted
            if (DELETED === 1) {
                setInvisible(task);
            }
            else {
                if (DONE === 0) {
                    setVisible(task);
                }
                else {
                    setInvisible(task);
                }
            }
        }
        else if (filter === 2) { // done, excluding deleted
            if (DELETED === 1) {
                setInvisible(task);
            }
            else {
                if (DONE === 1) {
                    setVisible(task);
                }
                else {
                    setInvisible(task);
                }
            }
        }
        else if (filter === 3) { // starred, excluding deleted
            if (DELETED === 1) {
                setInvisible(task);
            }
            else {
                if (STARRED === 1) {
                    setVisible(task);
                }
                else {
                    setInvisible(task);
                }
            }
        }
        else if (filter === 4) { // deleted
            if (DELETED === 1) {
                setVisible(task);
            }
            else {
                setInvisible(task);
            }
        }
    }
}

async function setVisible(elem) {
    elem.classList.remove("hidden");
}

async function setInvisible(elem) {
    elem.classList.add("hidden");
}

/**
 * updates each task to hide unneeded buttons depending on its state.
 * @param task task element to refresh
 */
function refreshTask(task) {
    let DONE = Number(task.getAttribute("data-done")); // 0 if no, 1 if yes
    let STARRED = Number(task.getAttribute("data-star")); // 0 if no, 1 if yes
    let DELETED = Number(task.getAttribute("data-deleted")); // 0 if no, 1 if yes

    let check_button = task.getElementsByClassName("check")[0];
    let edit_button = task.getElementsByClassName("edit")[0];
    let star_button = task.getElementsByClassName("star")[0];
    let delete_button = task.getElementsByClassName("delete")[0];
    let restore_button = task.getElementsByClassName("restore")[0];
    let true_delete_button = task.getElementsByClassName("true_delete")[0];

    if (DELETED === 1) { // remove other buttons and add restore
        setInvisible(check_button);
        setInvisible(edit_button);
        setInvisible(star_button);
        setInvisible(delete_button)
        setVisible(restore_button);
        setVisible(true_delete_button);
    }
    else {
        setVisible(check_button);
        setVisible(edit_button);
        setVisible(star_button);
        setVisible(delete_button);
        setInvisible(restore_button);
        setInvisible(true_delete_button);
    }

    if (DONE === 1) { // change done icon to x
        setInvisible(check_button.children[0]);
        setVisible(check_button.children[1]);
    }
    else {
        setVisible(check_button.children[0]);
        setInvisible(check_button.children[1]);
    }
    if (STARRED) { // change star icon to filled in
        setVisible(star_button.children[1]);
        setInvisible(star_button.children[0]);
    }
    else {
        setInvisible(star_button.children[1]);
        setVisible(star_button.children[0]);
    }
}

/**
 * Initializes a task element and hooks up all of its buttons
 * @param task task element to initialize
 */
async function assignButtons(task) {
    let ID = Number(task.getAttribute("data-id"));

    let check_button = task.getElementsByClassName("check")[0];
    let edit_button = task.getElementsByClassName("edit")[0];
    let star_button = task.getElementsByClassName("star")[0];
    let delete_button = task.getElementsByClassName("delete")[0];
    let restore_button = task.getElementsByClassName("restore")[0];
    let actually_delete_button = task.getElementsByClassName("true_delete")[0];

    check_button.addEventListener("click", async () => {
        let DONE = Boolean(Number(task.getAttribute("data-done")));
        let result = await update(ID, "DONE", !DONE);
        if (result) {
            task.setAttribute("data-done", Number(!DONE));
            refreshTask(task);
            filterTasks(selected);
        }
    });
    edit_button.addEventListener("click", () => {
        document.location.href = "/task/" + ID;
    });
    star_button.addEventListener("click", async () => {
        let STARRED = Boolean(Number(task.getAttribute("data-star")));
        let result = await update(ID, "STARRED", !STARRED);
        if (result) {
            task.setAttribute("data-star", Number(!STARRED));
            refreshTask(task);
            filterTasks(selected);
        }
    });
    delete_button.addEventListener("click", async () => {
        let result = await update(ID, "DELETED", true);
        if (result) {
            task.setAttribute("data-deleted", 1);
            refreshTask(task);
            filterTasks(selected);
        }
    });
    restore_button.addEventListener("click", async () => {
        let result = await update(ID, "DELETED", false);
        if (result) {
            task.setAttribute("data-deleted", 0);
            refreshTask(task);
            filterTasks(selected);
        }
    });
    actually_delete_button.addEventListener("click", async () => {
        let result = await deleteTask(ID);
        if (result) {
            task.remove();
        }
    });
}

/**
 * Helper function to update booleans, STARRED, DONE, and DELETED
 * @param note_id
 * @param type Either STARRED, DONE or DELETED
 * @param value 0 for false, or 1 for true
 * @returns {Promise<boolean>} true if update was successful false otherwise
 */
async function update(note_id, type, value) {
    let body_obj = {};
    body_obj.note_id = note_id;
    body_obj.type = type;
    body_obj.value = value;

    const options = { // https://www.geeksforgeeks.org/javascript-fetch-method/
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set content type to JSON
        },
        credentials: "include",
        body: JSON.stringify(body_obj) // Convert JSON data to a string and set it as the request body
    };
    const response = await fetch("/api/update", options);
    // console.log(response.status)
    if (response.status === 200) {
        return true;
    }
    return false;
}

/**
 * Helper function to delete a task
 * @param note_id
 * @returns {Promise<boolean>} true if succeeded, false otherwise.
 */
async function deleteTask(note_id) {
    let body_obj = {};
    body_obj.task_id = note_id;

    const options = { // https://www.geeksforgeeks.org/javascript-fetch-method/
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set content type to JSON
        },
        credentials: "include",
        body: JSON.stringify(body_obj) // Convert JSON data to a string and set it as the request body
    };
    const response = await fetch("/api/delete", options);
    // console.log(response.status)
    if (response.status === 200) {
        return true;
    }
    return false;
}