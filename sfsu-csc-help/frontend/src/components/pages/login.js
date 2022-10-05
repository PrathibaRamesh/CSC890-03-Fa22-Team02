import React from "react";
import Navbar from "../NavBar.jsx";
import { Link } from "react-router-dom";
import Axios from "axios";

const Login = (props) => {
    const [usernameLog, setUsernameLog] = React.useState('');
    const [passwordLog, setPasswordLog] = React.useState('');
    

    const login = () => {
        Axios.post('http://localhost:3002/login', {
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
        </div>
    );
};

export default Login;