import React, { useState } from "react";
import Navbar from "../NavBar.js";
import { Link } from "react-router-dom";
import Axios from "axios";

function Register() {
    window.history.forward();
    const [usernameReg, setUsernameReg] = React.useState('');
    const [studentnameReg, setStudentnameReg] = React.useState('');
    const [studentID, setStudentIdReg] = React.useState(''); 
    const [passwordReg, setPasswordReg] = React.useState('');
    const [confpasswordReg, setConfPasswordReg] = React.useState('');
    const [userRoleReg, setUserRoleReg] = React.useState('');
    const data = studentID;
    var globalVar = window.sessionStorage;
    globalVar.setItem("username", data);
    const userRoleData = userRoleReg;
    globalVar.setItem("userRole", userRoleData);

    const register = () => {
        console.log(usernameReg);
        if (usernameReg === '' || passwordReg === '' || studentID === '' || studentnameReg === '' || userRoleReg === '') {
            alert("All input fields are mandatory!!");
            //window.location.href = '/register';
        }
        else if (passwordReg !== confpasswordReg) {
            alert("Password and ConfirmPassword is not matching!! Try again.");
            window.location.href = '/register';
        }
        else {
            Axios.post('/register', {
                userName: usernameReg,
                userPassword: passwordReg,
                studentID: studentID,
                studentName: studentnameReg,
                userRole: userRoleReg,
            }).then((response) => {
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
                            id="studentName"
                            placeholder="Full Name"
                            required
                            autoFocus
                            onChange={(e) => { setStudentnameReg(e.target.value) }} />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text"
                            id="exampleInputEmail1"
                            placeholder="Email Id"
                            required
                            onChange={(e) => { setUsernameReg(e.target.value) }} />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text"
                            id="studenID"
                            placeholder="Student ID"
                            required
                            onChange={(e) => { setStudentIdReg(e.target.value) }} />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="password"
                            id="exampleInputPassword1"
                            placeholder="password"
                            required
                            onChange={(e) => { setPasswordReg(e.target.value) }} />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="password"
                            id="exampleInputPassword1"
                            placeholder="confirmPassword" 
                            required
                            onChange={(e) => { setConfPasswordReg(e.target.value) }} />
                    </div>
                    <br />

                    <div className="form-group">
                        <select onChange={(e) => { setUserRoleReg(e.target.value) }} required>
                            <option selected disabled value="">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Select Role &nbsp; &nbsp; &nbsp; &nbsp;</option>
                            <option value="General User">&nbsp; &nbsp; &nbsp; &nbsp; General User &nbsp; &nbsp; &nbsp; &nbsp;</option>
                            <option value="Administrator">&nbsp; &nbsp; &nbsp; &nbsp; Administrator &nbsp; &nbsp; &nbsp; &nbsp;</option>
                      </select>
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

