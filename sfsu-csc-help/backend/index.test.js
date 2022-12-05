const app = require("./index");
const helper = require("./helperFunc");
const request = require("supertest");
const { v4: uuidv4 } = require('uuid');



//generate random string of requrired length
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const abc = makeid(5);
const bbc = abc+"@gmail.com";

describe("Testing validation functions", () => {

    test("Test for valid email", () => {
        const result = helper.isEmail("anudeep@gmail.com");
        expect(result).toEqual(true)
    })

    test("Test for valid password", () => {
        const result = helper.isValidPassword("anudeep12");
        expect(result).toEqual(true)
    })

})

describe("register route", () => {
    test("testing email validation", async () => {
        const res = await request(app).post('/register').send({
            userName: "anudeep",
            // userPassword: "anudeep",
            // studentID: "123456",
            // studentName: "anudeep",
            // userRole: "admin"
        });

        expect(res.body).toEqual({"message1": "Incorrect email format. Please correct it!"});
    })
    test("testing password validation", async () => {
        const res = await request(app).post('/register').send({
            userName: "anudeep@gmail.com",
            userPassword: "deep",
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.body).toEqual({message2: "Password must contain 8 to 13 characters without special characters. Please correct it!"});
    })

    

      test("testing successfull registration", async () => {
        const res = await request(app).post('/register').send({
            
            userName: bbc,
            userPassword: "papper123",
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.statusCode).toEqual(250);
    })
})


describe("login route", () => {
    test("testing login verification", async () => {
        const res = await request(app).post('/login').send({
            userName: "99889",
            userPassword: "Asdfasdf",
            // studentID: "123456",
            // studentName: "anudeep",
            // userRole: "admin"
        });

        expect(res.statusCode).toEqual(200);
    })
    test("testing login icorrect part of the code", async () => {
        const res = await request(app).post('/login').send({
            userName: "99889",
            userPassword: "deep",
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.body).toEqual({ message: "Wrong username and password combination!" });
    })

    
})

describe("getFeedbackData route", () => {
    test("testing data if userRole is General User", async () => {
        const res = await request(app).post('/getFeedbackData').send({
            userRole: "General User",
            username: "922377791",
            // studentID: "123456",
            // studentName: "anudeep",
            // userRole: "admin"
        });

        expect(res.statusCode).toEqual(200);
    })

    test("testing data for wrong user when userRole is General User", async () => {
        const res = await request(app).post('/getFeedbackData').send({
            userRole: "General User",
            username: "ch@gmail.com",
            // studentID: "123456",
            // studentName: "anudeep",
            // userRole: "admin"
        });

        expect(res.body).toEqual({ message: "No data available!!" });
    })

    test("testing data if userRole is Administrator", async () => {
        const res = await request(app).post('/getFeedbackData').send({
            userRole: "Administrator",
            username: "samrat@gmail.com",
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.statusCode).toEqual(200);
    })

   

    
})

describe("Testing question register route", () => {
    test("testing if the request is rejected when all parameters are not sent", async () => {
        const res = await request(app).post('/questionRegister').send({
            
            userName: "samrat@gmail.com"
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.statusCode).toEqual(400);
    })

    test("testing insert data", async () => {
        const res = await request(app).post('/questionRegister').send({
            
            userName: "abc",
            question: "abc",
            answer: "abc",
            feedback: "abc",
            comment: "abc",
            rating: "abc",
            userRole: "abc"
        });

        expect(res.statusCode).toEqual(200);
    })



})

