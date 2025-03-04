const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


// logging
app.use((req, res, next) => {
    res.on("finish", () => {
        let url = `${"http://" + req.get("host") + req.path}`
        console.log(`| ${req.method.padEnd(4, " ")} | ${url.padEnd(45, " ")} | ${res.statusCode} |`);
    });
    next();
});

app.set("view engine", "pug"); // setup pug

app.use(express.static("public")); // allows access to all files in public
app.use(express.json()); // parses json bodies sent by the client
app.use(express.urlencoded({extended: false})); // parsing form bodies sent by the client
app.use(cookieParser()); // parse cooke request header

// page routes
var mainRouter = require('./routes/main');
app.use('/', mainRouter);

var accountRouter = require('./routes/account');
app.use('/', accountRouter);

var taskRouter = require('./routes/task');
app.use('/', taskRouter);

var createRouter = require('./routes/create');
app.use('/', createRouter);

// api routes
var authenticationRouter = require('./routes/api/api_authenticate');
app.use('/', authenticationRouter);

var logoutRouter = require('./routes/api/api_logout');
app.use('/', logoutRouter);

var updateRouter = require('./routes/api/api_update');
app.use('/', updateRouter);

var apiCreateRouter = require('./routes/api/api_create');
app.use('/', apiCreateRouter);

var deleteRouter = require('./routes/api/api_delete');
app.use('/', deleteRouter);

var editRouter = require('./routes/api/api_edit');
app.use('/', editRouter);

var commentRouter = require('./routes/api/api_comments');
app.use('/', commentRouter);

app.use((req, res, next) => {
    res.status(404);
    res.render('message', {
        title: "404",
        header_message: "404",
        description: "Page Not Found",
        redirect: "/",
        redirect_message: "Go Back"
    });
});

// error handler
app.use((req, res, next) => {
    console.log(req);
    res.status(500)
    res.render('message', {
        title: "500",
        header_message: "500",
        description: "Server Error",
        redirect: "/",
        redirect_message: "Go Back"
    });
});

module.exports = app;
