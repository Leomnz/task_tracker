document.addEventListener("DOMContentLoaded", () => {
    const task_id = Number(document.getElementById("expanded_task_id").getAttribute("data-id"));

    let comment_container = document.getElementById("inner_comment_container")
    const comment_add_button = document.getElementById("comment_add");
    const template_comment = document.getElementById("template");

    // assign comment add button, to send a request to back end and make a new element
    comment_add_button.addEventListener("click", async () => {
        const comment_add_content = document.getElementById("comment_add_content").value;
        // console.log(comment_add_content);
        let result = await tryCreate(task_id, comment_add_content)
        if (result) {
            let comment_id = result[0];
            let comment_content = result[1];
            let new_comment = template_comment.cloneNode(true);
            new_comment.classList.remove("hidden");
            new_comment.setAttribute("data-id", comment_id);
            new_comment.removeAttribute("id");
            let text = new_comment.getElementsByClassName("comment_text")[0]
            text.innerText = comment_content;

            registerButtons(task_id, new_comment, comment_container)
            comment_container.appendChild(new_comment);
        }
    });

    // assign delete button on comments
    let comments = document.getElementsByClassName("real_comment");
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        registerButtons(task_id, comment, comment_container);
    }
})

/**
 * Helper function for registering the delete button on a comment
 * @param task_id
 * @param comment comment element
 * @param comment_container
 */
async function registerButtons(task_id, comment, comment_container) {
    let comment_id = Number(comment.getAttribute("data-id"));
    let remove_button = comment.getElementsByClassName("comment_remove")[0];

    remove_button.addEventListener("click", async () => {
        let result = await tryDelete(task_id, comment_id);
        if (result) {
            comment_container.removeChild(comment);
        }
    })
}

/**
 * Tries to create a new comment
 * @param task_id
 * @param content content for the comment
 * @returns {Promise<(number|boolean|*)[]|boolean>} false if failed, otherwise array [newID, content]
 */
async function tryCreate(task_id, content) {
    let body_obj = {};
    body_obj.comment_content = content;
    body_obj.task_id = task_id;

    const options = {
        method: "POST", headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body_obj)
    };
    const response = await fetch("/api/comment/create", options);
    if (response.status === 200) {
        let json = await response.json();
        return [json.ID, content];
    }
    else {
        return false;
    }
}

/**
 * tries to delete a comment
 * @param task_id
 * @param comment_id
 * @returns {Promise<boolean>} true if succeded, false otherwise
 */
async function tryDelete(task_id, comment_id) {
    let body_obj = {};
    body_obj.comment_id = comment_id;
    body_obj.task_id = task_id;

    const options = {
        method: "POST", headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body_obj)
    };
    const response = await fetch("/api/comment/delete", options);
    if (response.status === 200) {
        return true;
    }
    else {
        return false;
    }
}
