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

  module.exports = {isEmail, isValidPassword};