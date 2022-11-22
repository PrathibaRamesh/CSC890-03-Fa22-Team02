const app = require("./index");
const helper = require("./helperFunc");
const request = require("supertest");





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

    // test("testing successfull registration", async () => {
    //     const res = await request(app).post('/register').send({
    //         userName: "happy@gmail.com",
    //         userPassword: "vishwa123",
    //         //studentID: "123456",
    //         //studentName: "anudeep",
    //         //userRole: "admin"
    //     });

    //     expect(res.body).toEqual({message3: "Registration successful!!!"});
    // })

      test("testing successfull registration", async () => {
        const res = await request(app).post('/register').send({
            userName: "papper@gmail.com",
            userPassword: "papper123",
            //studentID: "123456",
            //studentName: "anudeep",
            //userRole: "admin"
        });

        expect(res.body).toEqual({message3: "Registration successful!!!"});
    })
})


describe("login route", () => {
    test("testing login verification", async () => {
        const res = await request(app).post('/login').send({
            userName: "happy@gmail.com",
            userPassword: "vishwa123",
            // studentID: "123456",
            // studentName: "anudeep",
            // userRole: "admin"
        });

        expect(res.body).toEqual([{"studentID": null, "studentName": null, "userName": "happy@gmail.com", "userPassword": "jGwd6BiyeqrVxCbe6+Xk8g==", "userRole": null}]);
    })
    test("testing login icorrect part of the code", async () => {
        const res = await request(app).post('/login').send({
            userName: "happy@gmail.com",
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
            username: "chuchu@gmail.com",
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

