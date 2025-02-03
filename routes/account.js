var express = require('express');
var router = express.Router();

router.get('/account', function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
        res.status(200);
        res.render('logout', {title: "Account"})
        return
    }
    res.status(200);
    res.render('account', {title: "Account"});
});

module.exports = router;
