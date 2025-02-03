var express = require('express');
var router = express.Router();
const {checkToken, createTask} = require("../../data");

router.post('/api/create', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const title = req.body.task_title;
    const content = req.body.task_content;

    if (title === undefined || content === undefined || title === "") {
        res.status(400);
        res.send();
    }
    if (token) {
        let account_id = await checkToken(token);
        if (account_id !== false) {
            let result = await createTask(title, content, account_id);
            if (result) {
                res.status(200);
                res.send();
                return;
            }
            else {
                res.status(400);
                res.send();
                return;
            }
        }
    }
    res.status(401);
    res.send();
});

module.exports = router;
