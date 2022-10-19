const express = require("express");
// If you have installed MYSQL 8.0 you need to use mysql2 package
// instead of old mysql because of secure authentication process
// which is not provided by mysql package.
const mysql = require("mysql2"); 
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user : "root",
    host: "34.170.175.124",
    password: "sfsucshelp",
    database: "cshelp",
});

// Have Node serve the files for our built React app
// Only use this middleware when you want to deploy.
// On localhost comment it out.
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.post('/register', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    db.query(
        "INSERT INTO users (userName, userPassword) values (?,?)",
        [userName, userPassword],
        (err, result) => {
            if (err != null) {
                console.log(err);
            }
        }
    );
});

app.post('/login', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    db.query(
        "SELECT * FROM users WHERE userName = ? AND userPassword = ?",
        [userName, userPassword],
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "Wrong username and password combination!" });
            }
        }
    );
});

app.post('/questionRegister', (req, res) => {

    const userName = req.body.userName;
    const question = req.body.question;
    const answer = req.body.answer;
    const feedback = req.body.feedback;

    db.query(
        "INSERT INTO userquestionlog (userName, question, answer, feedback) values (?,?,?,?)",
        [userName, question, answer, feedback],
        (err, result) => {
            if (err != null) {
                console.log(err);
            }
        }
    );
});

// All other GET requests not handled before will return our React app.
// On localhost comment it out, because in development version create
// react app gets served by webpack dev server
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });



app.listen(3008, () => {
    console.log("server running");
});