var express = require('express');
const {checkToken} = require("../data");
var router = express.Router();

router.get('/create', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const task_id = req.params.id;
    if (token) {
        let account_id = await checkToken(token);
        // console.log("Found ID", Account_ID);
        if (account_id !== false) {
            res.status(200);
            res.render("create", {title: "Create"})
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
