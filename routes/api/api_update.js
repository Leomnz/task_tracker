var express = require('express');
var router = express.Router();
const {checkToken, updateBool} = require("../../data");


router.post('/api/update', async function (req, res, next) {
    const token = req.cookies.token; // secureCookies would be used I think once this was not on localhost
    const note_id = req.body.note_id;
    const type = req.body.type; // DONE, STAR, DELETED
    const value = req.body.value; // true, false

    if (!(["DONE", "STARRED", "DELETED"].includes(type))) {
        res.status(400);
        res.send();
    }
    if (typeof value !== "boolean") {
        res.status(400);
        res.send();
    }
    if (typeof note_id !== "number") {
        res.status(400);
        res.send();
    }

    // console.log("token", token)
    if (token) {
        let account_id = await checkToken(token);
        // console.log("Found ID", Account_ID);
        if (account_id !== false) {
            let result = await updateBool(account_id, note_id, type, value);
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
