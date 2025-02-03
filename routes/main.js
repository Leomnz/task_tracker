var express = require('express');
var router = express.Router();
const {checkToken, getTasks} = require("../data");

router.get('/', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    // console.log("token", token)
    if (token) {
        let account_id = await checkToken(token);
        // console.log("Found ID", ID);
        if (account_id !== false) {
            let tasks = await getTasks(account_id)
            res.status(200);
            res.render("main", {title: "Butterfly Tasks", data: tasks});
            return
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
