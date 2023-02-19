const express = require("express");
const path = require("path");
const userRouter = require("./routes/users");
const app = express();

const PORT = 8080;
const HOSTNAME = "127.0.0.1";

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    console.log("[SERVER]: loaded main.ejs");
    res.render("main");
});

app.use("/users", userRouter);

app.listen(PORT, HOSTNAME, () => {
    console.log(`[SERVER]: running at ${HOSTNAME}:${PORT}`);
});