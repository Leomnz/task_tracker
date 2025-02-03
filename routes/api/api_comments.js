var express = require('express');
var router = express.Router();
const {checkToken, deleteComment, createComment} = require("../../data");

router.post('/api/comment/delete', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const comment_id = req.body.comment_id;
    const task_id = req.body.task_id;

    if (comment_id === undefined || task_id === undefined) {
        res.status(400);
        res.send();
        return;
    }
    if (token) {
        let account_id = await checkToken(token);
        if (account_id !== false) {
            let result = await deleteComment(comment_id, task_id, account_id);
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

router.post('/api/comment/create', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const content = req.body.comment_content;
    const task_id = req.body.task_id;

    if (content === undefined || task_id === undefined || content === "") {
        res.status(400);
        res.send();
        return;
    }
    if (token) {
        let Account_ID = await checkToken(token);
        if (Account_ID !== false) {
            let result = await createComment(task_id, Account_ID, content);
            if (result) {
                res.status(200);
                res.send({ID: result});
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
