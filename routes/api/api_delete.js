var express = require('express');
var router = express.Router();
const {checkToken, deleteTask} = require("../../data");

router.post('/api/delete', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const task_id = req.body.task_id;

    if (task_id === undefined) {
        res.status(400);
        res.send();
    }
    if (token) {
        let account_id = await checkToken(token);
        if (account_id !== false) {
            let result = await deleteTask(task_id, account_id);
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
