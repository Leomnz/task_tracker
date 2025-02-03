document.addEventListener("DOMContentLoaded", () => {
    const submit_button = document.getElementById("expanded_submit");
    const back_button = document.getElementById("expanded_back");

    // assign submit button
    submit_button.addEventListener("click", () => {
        tryCreate();
    })

    // assign back button
    back_button.addEventListener("click", () => {
        document.location.href = "/"
    })
})

/**
 * Tries to create a new task
 */
async function tryCreate() {
    const title = document.getElementById("expanded_task_title").textContent;
    const content = document.getElementById("expanded_task_content").textContent;

    // console.log(title, content, ID)
    let body_obj = {};
    body_obj.task_title = title;
    body_obj.task_content = content;


    const options = { // https://www.geeksforgeeks.org/javascript-fetch-method/
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set content type to JSON
        },
        credentials: "include",
        body: JSON.stringify(body_obj) // Convert JSON data to a string and set it as the request body
    };
    const response = await fetch("/api/create", options);
    if (response.status === 200) {
        alert("success");
    }
    else {
        alert("failure");
    }

}