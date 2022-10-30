import React from "react";
import Help from "../pages/help";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

const Login = (props) => {
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [userHelp, setuserHelp] = useState('');
    const data = usernameLog;
    var globalVar = window.sessionStorage;
    globalVar.setItem("username", data);
    const login = () => {
        Axios.post('/login', {
            userName: usernameLog,
            userPassword: passwordLog
        }).then((response) => {

            if (response.data.message) {
                alert(response.data.message);
                window.location.href = '/';
            }
            else {
                window.location.href = '/home';
            }
            console.log(response.data);
        });
    };

    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">Welcome back to SFSU Student Self Help Centre!</h2>
                <h4 className="form-title">Login here</h4>

                <form>
                    <div className="form-group form-entry">
                        <input
                            type="text"
                            id="exampleInputEmail1"
                            placeholder="email / username"
                            required
                            autoFocus
                            onChange={(e) => { setUsernameLog(e.target.value) }} />
                    </div>
                    <br />

                    <div className="form-group">
                        <input
                            type="password"
                            id="exampleInputPassword1"
                            placeholder="password"
                            onChange={(e) => { setPasswordLog(e.target.value) }} />
                    </div>
                    <br />

                    <div className="nav-a">
                        <Link
                            to={"/register"}
                            className="btn btn-outline-success my-2 my-sm-0 button"
                        >
                            New User ? Sign up
                        </Link>
                        <button type="button" className="btn btn-primary button" onClick={login}>
                            {'Submit'}
                        </button>
                    </div>
                </form>
            </div>

            {userHelp ? (
            <div>
                <Help data={data} />
                </div>
                ) : ( null )}
        </div>
    );
};

export default Login;