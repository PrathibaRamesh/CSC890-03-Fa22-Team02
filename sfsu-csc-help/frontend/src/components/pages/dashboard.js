import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import Navbar from "../NavBar.js";

const Dashboard = (props) => {
    window.history.forward();
    const [posts, setPosts] = useState({ blogs: [] });
    var globalVar = window.sessionStorage;
    var userRole = globalVar.getItem("userRole");
    var loggedname = globalVar.getItem("username");

    useEffect(() => {
        axios.post('/getFeedbackData', {
            userRole: userRole,
            username: loggedname,
        }).then((response) => {

            console.log(response.data);
            console.log(userRole);

            if (response.data.message == "No data available!!") {
                alert("No data available to show!!");
                window.location.href = '/home';
            }
            else {
                setPosts({ blogs: response.data });
                console.log(response.data.message);
            }
            
        });
    }, [setPosts]);

    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            {userRole === "General User" ? (
            <div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Question</th>
                            <th>Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.blogs &&
                            posts.blogs.map((item) => (
                                <tr key={item.username}>
                                    <td>{item.username}</td>
                                    <td>{item.question}</td>
                                    <td>{item.answer}</td>
                                </tr>
                            ))}
                    </tbody>
                </ReactBootStrap.Table>
            </div>
            ) : (
                    <div>
                        <ReactBootStrap.Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Feedback</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.blogs &&
                                    posts.blogs.map((item) => (
                                        <tr key={item.username}>
                                            <td>{item.username}</td>
                                            <td>{item.question}</td>
                                            <td>{item.answer}</td>
                                            <td>{item.feedback}</td>
                                            <td>{item.rating}</td>
                                            <td>{item.comment}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </ReactBootStrap.Table>
                    </div>
            )}

        </div>
    );
}
export default Dashboard;
