const express = require("express");
const util = require("util");
const Util = require("../utilities/utils");
const { MongoClient } = require("mongodb")
const router = express.Router();

const dbURI = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dbURI);
const userDB = client.db("SimpleLoginDB").collection("users");

router.get("/", (req, res) => {
    res.redirect("/users/login");
});

router.get("/login", (req, res) => {
    console.debug(`${Util.greenColor("[SERVER]")}: loaded login page`);
    res.render("./user/login");
});

router.post("/login", (req, res) => {
    const user = {
        name: req.body.username,
        password: req.body.password
    };
    console.debug(`${Util.greenColor("[SERVER]")}: post request to /login with object: ${util.inspect(user, false, null, true)}`);
    userDB.findOne({ name: user.name, pwd: user.password }).then(doc => {
        if(doc != null) {
            console.log(`${Util.greenColor("[SERVER]")}: received answer from db: ${doc.name}`);
            res.redirect(`/users/${doc.name}`);
            return;
        }
        console.error(`${Util.redColor("[SERVER ERROR]")}: given credentials are not in the database`);
        res.redirect("/users/login");
    });
});

router.get("/register", (req, res) => {
    res.render("./user/register");
});

router.post("/register", (req, res) => {
    const user = {
        name: req.body.username,
        password: req.body.password
    };
    userDB.insertOne({
        name: user.name,
        pwd: user.password
    }).then(doc => {
        if(doc.acknowledged) {
            console.debug(`${Util.greenColor("[SERVER]")}: post request to /register with object: ${util.inspect(user, false, null, true)}`);
            res.redirect("/users/login");
            console.log(`${Util.greenColor("[SERVER]")}: redirected to: /users/${user.name}`);
            return;
        }
        console.error(`${Util.redColor("[SERVER ERROR]")}: could not save user in the database`);
        res.redirect("/users/register");
    }).catch(err => {
        console.error(`${Util.redColor("[SERVER ERROR]")}: ${err}`);
    });
});

router.get("/:uuid", (req, res) => {
    res.render("./user/user-dashboard", {
        name: req.params.uuid,
        profile: "<empty>"
    });
});

module.exports = router;