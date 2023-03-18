//
const express = require("express");
const { urlencoded } = require("express");
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Middleware
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.json());
// connecting db
let dbURL;
if (process.env.NODE_ENV === "production") {
    dbURL =
        "";
}
if (process.env.NODE_ENV !== "production") {
    dbURL = "mongodb://127.0.0.1:27017/JWT";
}

// initializing port
const PORT = process.env.PORT || 5000;

// connecting the db
mongoose
    .connect(dbURL)
    .then((result) => {
        app.listen(PORT);
        console.log("Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    });

// API
app.get("/", (req, res) => {
    res.json({ msg: "gotten successfully" });
    // res.status(200).send("gooten successfully");
});
app.use("/reg", require("./Routes/RegRoutes"));
app.use("/auth", require("./Routes/auth"));
