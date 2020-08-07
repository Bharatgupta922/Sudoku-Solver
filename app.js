//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {

    res.render("home");

});


app.get("/3into3", function (req, res) {
    res.render("NXN", {
        n: 3
    });
});

app.get("/9into9", function (req, res) {
    res.render("NXN", {
        n: 9
    });
});

app.get("/12into12", function (req, res) {
    res.render("NXN", {
        n: 12
    });
});





app.listen(3000, function (req, res) {
    console.log("Server has started at port number : 3000");
});