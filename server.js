var app = require("./app");
const {setup} = require("./data");

const port = 8080;
app.set("port", port);

async function startApp() {
    console.log("Starting database setup...");
    await setup();

    app.listen(port, () => {
        console.log(`Started! http://localhost:${port}`);
    });
}


startApp().catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
});