var express = require('express');
var router = express.Router();
const {generateToken, login, signup} = require("../../data.js");

router.post('/api/authenticate', async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let method = req.body.method; // either login or signup

    if (username === undefined || password === undefined) {
        res.status(400);
        res.send({"error": "Need username and password"});
        return;
    }

    let result = null;
    if (method === "login") {
        result = await login(username, password);
    }
    if (method === "signup") {
        result = await signup(username, password);
    }
    // console.log(result);
    if (result === null || result === false) {
        res.status(401);
        res.send({"error": "Invalid username or password"});
        return;
    }

    let token = await generateToken(result);
    // console.log("auth token", token);
    res.status(200);
    res.cookie("token", token, { // https://dev.to/alexmercedcoder/expressjs-handling-cross-origin-cookies-38l9
        // can only be accessed by server requests
        httpOnly: true,
        // path = where the cookie is valid
        path: "/",
        // domain = what domain the cookie is valid on
        domain: "localhost",
        // secure = only send cookie over https
        secure: false, // would be true once not on localhost
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
        // maxAge = how long the cookie is valid for in milliseconds
        maxAge: 3600000, // 1 hour
    });
    res.send();
});

module.exports = router;
