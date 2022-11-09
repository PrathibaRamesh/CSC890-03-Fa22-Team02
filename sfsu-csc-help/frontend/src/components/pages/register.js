import React, { useState } from "react";
import Navbar from "../NavBar.js";
import { Link } from "react-router-dom";
import Axios from "axios";

function Register() {
    const [usernameReg, setUsernameReg] = React.useState('');
    const [passwordReg, setPasswordReg] = React.useState('');
    const [confpasswordReg, setConfPasswordReg] = React.useState('');

    const register = () => {
        if (passwordReg !== confpasswordReg) {
            alert("Password and ConfirmPassword is not matching!! Try again.");
            window.location.href = '/register';
        }
        else {
            Axios.post('/register', {
                userName: usernameReg,
                userPassword: passwordReg
            }).then((response) => {
                console.log("Happy");

                    if (response.data.message1) {
                        console.log(response.data);
                        alert(response.data.message1);
                        window.location.href = '/register';
                        //console.log(response.data.message1);
                    }
                    else if(response.data.message2){
                        console.log(response.data);
                        alert(response.data.message2);
                        window.location.href = '/register'
                        //console.log(response.data.message2);
                    }
                    else if(response.data.message3){

                        console.log("Registration Successful!!");
                        alert(response.data.message3);
                        window.location.href = '/home';
                    }
                    
                });

               
            
           
        }
    };

    return (
        <div >
            <div className="form-container">
                <h2 className="form-title">Welcome to SFSU Student Self Help Centre!</h2>
                <h4 className="form-title">Register here</h4>
                <form>
                    <div className="form-group form-entry">
                        <input type="text"
                            id="exampleInputEmail1"
                            placeholder="email / username"
                            required
                            autoFocus
                            onChange={(e) => { setUsernameReg(e.target.value) }} />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="password"
                            id="exampleInputPassword1"
                            placeholder="password"
                            onChange={(e) => { setPasswordReg(e.target.value) }} />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="password"
                            id="exampleInputPassword1"
                            placeholder="confirmPassword" 
                            onChange={(e) => { setConfPasswordReg(e.target.value) }} />
                    </div>
                    <br />

                    <div className="nav-a">
                        <Link
                            to={"/"}
                            className="btn btn-outline-success my-2 my-sm-0 button"
                        >
                            Existing User? Log In!
                        </Link>

                        <button type="button" className="btn btn-primary button" onClick={register}>
                            {'Submit'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Register;

