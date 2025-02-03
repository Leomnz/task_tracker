document.addEventListener("DOMContentLoaded", () => {
    const logout_button = document.getElementById("logout_button");
    // assign logout button
    logout_button.addEventListener("click", async () => {
        const options = {
            method: "POST",
            credentials: "include"
        };
        const response = await fetch("/api/logout", options);
        document.location.reload();
    })

    // assign back button
    const back_button = document.getElementById("back_button");
    back_button.addEventListener("click", async () => {
        document.location.href = "/";
    })
})