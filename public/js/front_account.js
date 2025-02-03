let isLogin = true;
window.addEventListener("load", () => {
    let signup = document.getElementById("signup");
    let login = document.getElementById("login");
    // console.log("loaded front_account.js")

    checkLoginSignup(signup, login); // hide whichever version of the page we are not on


    // assign the switch to create mode button
    let create_switch = document.getElementById("create_switch");
    create_switch.addEventListener("click", () => {
        isLogin = false;
        checkLoginSignup(signup, login);
    });

    // assign the switch to login mode button
    let login_switch = document.getElementById("login_switch");
    login_switch.addEventListener("click", () => {
        isLogin = true;
        checkLoginSignup(signup, login);
    });

    // assign the login button
    let login_form = document.getElementById("login_form");
    login_form.addEventListener("submit", (event) => {
        event.preventDefault();
        let username = document.getElementById("login_username").value;
        let password = document.getElementById("login_password").value;
        try_auth(username, password, "login");
    });

    // assign the signup button
    let signup_form = document.getElementById("signup_form");
    signup_form.addEventListener("submit", (event) => {
        event.preventDefault();
        let username = document.getElementById("signup_username").value;
        let password = document.getElementById("signup_password").value;
        try_auth(username, password, "signup");
    });
});

/**
 * Renders the correct version of the page based on the isLogin global variable
 * @param signup
 * @param login
 */
function checkLoginSignup(signup, login) {
    if (isLogin) {
        setInvisible(signup);
        setVisible(login);
    }
    else {
        setInvisible(login);
        setVisible(signup);
    }
}

async function setVisible(elem) {
    elem.classList.remove("hidden");
}

async function setInvisible(elem) {
    elem.classList.add("hidden");
}

/**
 * Helper function to login / signup
 * @param username
 * @param password
 * @param method "login" or "signup"
 */
async function try_auth(username, password, method) {
    let body_obj = {};
    body_obj.username = username;
    body_obj.password = password;
    body_obj.method = method

    const options = { // https://www.geeksforgeeks.org/javascript-fetch-method/
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Set content type to JSON
        },
        credentials: "include",
        body: JSON.stringify(body_obj) // Convert JSON data to a string and set it as the request body
    };
    // console.log("Requesting URL: "+window.location.hostname+"/api/authenticate");
    const response = await fetch("/api/authenticate", options);
    if (response.status === 200) {
        if (method === "signup") {
            document.location.reload();
        }
        else {
            document.location.reload();
        }
    }
    else {
        if (method === "signup") {
            alert("signup failed, try another username");
        }
        else {
            alert("login failed");
        }
    }
}