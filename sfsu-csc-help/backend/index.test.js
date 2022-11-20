const email = require("./index");

describe("Testing validation functions", () => {

    test("Test for valid email", () => {
        const result = email.isEmail("anudeep@gmail.com");
        expect(result).toEqual(true)
    })

    test("Test for valid password", () => {
        const result = email.isValidPassword("anudeep12");
        expect(result).toEqual(true)
    })

})