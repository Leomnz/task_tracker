var app = require("./app");

const port = 4131;
app.set("port", port);

app.listen(port, () => {
    console.log(`Started! http://localhost:${port}`);
});
