document.addEventListener("DOMContentLoaded", () => {
    const submit_button = document.getElementById("expanded_submit");
    const back_button = document.getElementById("expanded_back");

    submit_button.addEventListener("click", () => {
        tryEdit();
    })
    back_button.addEventListener("click", () => {
        document.location.href = "/"
    })
})

/**
 * Tries to make the changes to the task you edited
 */
async function tryEdit() {
    const title = document.getElementById("expanded_task_title").textContent;
    const content = document.getElementById("expanded_task_content").textContent;
    const ID = Number(document.getElementById("expanded_task_id").getAttribute("data-id"));

    // console.log(title, content, ID)
    let body_obj = {};
    body_obj.task_title = title;
    body_obj.task_content = content;
    body_obj.task_id = ID;


    const options = { // https://www.geeksforgeeks.org/javascript-fetch-method/
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set content type to JSON
        },
        credentials: "include",
        body: JSON.stringify(body_obj) // Convert JSON data to a string and set it as the request body
    };
    const response = await fetch("/api/edit", options);
    if (response.status === 200) {
        alert("success");
    }
    else {
        alert("failure");
    }

}