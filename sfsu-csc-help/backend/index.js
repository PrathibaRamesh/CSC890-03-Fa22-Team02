const express = require("express");
// If you have installed MYSQL 8.0 you need to use mysql2 package
// instead of old mysql because of secure authentication process
// which is not provided by mysql package.
const aesEcb = require("aes-ecb");
const mysql = require("mysql2"); 
const cors = require("cors");
const path = require("path");
const mysqlDetails = require("./connectionDetails");
const helper = require("./helperFunc");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3008;

// Used in encryption
let key = "xcdade22kao^mdq&";


const db = mysql.createConnection({
    user : mysqlDetails.username,
    host: mysqlDetails.hostname,
    password: mysqlDetails.password,
    database: mysqlDetails.database,
});

// Have Node serve the files for our built React app
// Only use this middleware when you want to deploy.
// On localhost comment it out.
app.use(express.static(path.resolve(__dirname, "../frontend/build")));




app.post('/register', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const studentID = req.body.studentID;
    const studentName = req.body.studentName;
    const userRole = req.body.userRole;

    console.log("We are in register page");
    // if(!req.body.userName || !req.body.userPassword || !req.body.studentID || !req.body.studentName || !req.body.userRole){
    //     console.log("We are here");
    //     res.status(400).json('you need to pass firstname');
    //     return;
    // }
    // else{
    //     res.sendStatus(201);
    //     return;
    // }

    if(!helper.isEmail(userName)){
        res.send({ message1: "Incorrect email format. Please correct it!" });
        //console.log("Incorrect email format");
    }   

    else if(!helper.isValidPassword(userPassword)){
        res.send({message2: "Password must contain 8 to 13 characters without special characters. Please correct it!"});
        //console.log("Incorrect password format");
    }
    else{

        //hashing the password
        const hashedPassword = aesEcb.encrypt(key, userPassword);
        console.log("Hashed Password is: "+hashedPassword);

        db.query(
            "INSERT INTO users (userName, userPassword, studentID, studentName, userRole) values (?,?,?,?,?)",
            [userName, hashedPassword, studentID, studentName, userRole],
            (err, result) => {
                if (err != null) {
                    console.log(err);
                }
                else{
                    res.send({message3: "Registration successful!!!"});
                }
            }
        );
    }
    
});

app.post('/login', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const hashedPassword = aesEcb.encrypt(key, userPassword);
    console.log("Original Password when checking: "+userPassword);
    console.log("Hashed Password when checking: "+hashedPassword);
    db.query(
        "SELECT * FROM users WHERE userName = ? AND userPassword = ?",
        [userName, hashedPassword],
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.statusCode = 200;
                res.send(result);
            }
            else {
                res.send({ message: "Wrong username and password combination!" });
            }
        }
    );
});

app.post('/getFeedbackData', (req, res) => {

    const userRole = req.body.userRole;
    const username = req.body.username;

    if (userRole === "General User") {
        db.query(
            "SELECT * FROM userquestionlog WHERE username = ?",
            [username],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                if (result.length > 0) {
                    res.sendStatus(200);
                    res.send(result)
                }
                else {
                    res.send({ message: "No data available!!" });
                }
            }
        );
    }
    else if (userRole === "Administrator") {
        db.query(
            "SELECT * FROM userquestionlog",
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                }
                if (result.length > 0) {
                    res.statusCode = 200;
                    res.send(result)
                }
                else {
                    res.send({ message: "No data available!!" });
                }
            }
        );
    }
});

app.post('/questionRegister', (req, res) => {

    const userName = req.body.userName;
    const question = req.body.question;
    const answer = req.body.answer;
    const feedback = req.body.feedback;
    const comment = req.body.comment;
    const rating = req.body.rating;
    const userRole = req.body.userRole;

    console.log("We are in questionRegister page");
    if(!req.body.userName || !req.body.question || !req.body.answer || !req.body.feedback || !req.body.comment || !req.body.rating || !req.body.userRole){
        console.log("We are here");
        res.status(400).json('you need to pass firstname');
        return;
    }
    


    db.query(
        "INSERT INTO userquestionlog (userName, question, answer, feedback, rating, comment, userRole) values (?,?,?,?,?,?,?)",
        [userName, question, answer, feedback, rating, comment, userRole],
        (err, result) => {
            if (err != null) {
                console.log(err);
            }
            else{
                res.sendStatus(200);
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



app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT} \n`);
});

module.exports = app;
