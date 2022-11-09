const express = require("express");
// If you have installed MYSQL 8.0 you need to use mysql2 package
// instead of old mysql because of secure authentication process
// which is not provided by mysql package.
const aesEcb = require("aes-ecb");
const mysql = require("mysql2"); 
const cors = require("cors");
const path = require("path");
const mysqlDetails = require("./connectionDetails");

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


//Helper functions to perform miscellaneous actions
const isEmail = (email) => {
    const validEmail =
      /^(?=.{1,45}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    return validEmail.test(email);
  };


const isValidPassword = (password) => {
    const validPassword = /^(?=.{8,13}$)[0-9a-zA-Z]+$/;
  
   
    return validPassword.test(password);
  };


app.post('/register', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    if(!isEmail(userName)){
        res.send({ message1: "Incorrect email format. Please correct it!" });
        //console.log("Incorrect email format");
    }   

    else if(!isValidPassword(userPassword)){
        res.send({message2: "Incorrect password format. Please correct it!"});
        //console.log("Incorrect password format");
    }
    else{

        //hashing the password
        const hashedPassword = aesEcb.encrypt(key, userPassword);
        //console.log("Hashed Password is: "+hashedPassword);

        db.query(
            "INSERT INTO users (userName, userPassword) values (?,?)",
            [userName, hashedPassword],
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
    //console.log("Hashed Password when checking: "+originalPassword);
    db.query(
        "SELECT * FROM users WHERE userName = ? AND userPassword = ?",
        [userName, hashedPassword],
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

app.post('/getFeedbackData', (req, res) => {

    db.query(
        "SELECT * FROM userquestionlog",
        (err, result) => {
            if (err) {
                //console.log(err);
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ message: "No data available!!" });
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} \n`);
});