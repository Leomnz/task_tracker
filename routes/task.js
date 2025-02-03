var express = require('express');
const {checkToken, getTask, getComments} = require("../data");
var router = express.Router();

router.get('/task/:id', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const task_id = req.params.id;
    if (token) {
        let account_id = await checkToken(token);
        // console.log("Found ID", account_id);
        if (account_id !== false) {
            let tasks = await getTask(account_id, task_id)
            if (tasks === false) {
                res.status(404);
                res.render('message', {
                    title: "404",
                    header_message: "404",
                    description: "Page Not Found",
                    redirect: "/",
                    redirect_message: "Go Back"
                });
                return;
            }
            let comments = await getComments(task_id, account_id)
            let comment_data = {}
            if (comments) {
                comment_data = comments
            }
            // console.log(comment_data);
            // console.log(tasks);
            tasks = tasks[0]; // first elem
            res.status(200);
            res.render('task', {title: "Edit", data: tasks, comments: comment_data});
            return;
        }
    }
    res.status(401);
    res.render('message', {
        title: "Not Logged In",
        header_message: "Not Logged In",
        description: "",
        redirect: "/account",
        redirect_message: "Please Login"
    });
});

module.exports = router;
