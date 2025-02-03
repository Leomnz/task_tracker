var express = require('express');
var router = express.Router();

router.post('/api/logout', async function (req, res, next) {
    res.clearCookie("token");
    res.status(200).send({});
});

module.exports = router;
