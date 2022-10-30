import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import Navbar from "../NavBar.js";

const Dashboard = (props) => {

    const [posts, setPosts] = useState({ blogs: [] });

    useEffect(() => {
        axios.post('/getFeedbackData', {
        }).then((response) => {

            console.log(response.data.message);

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

            <div>
                <ReactBootStrap.Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Feedback</th>
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
                                </tr>
                            ))}
                    </tbody>
                </ReactBootStrap.Table>
            </div>
            

        </div>
    );
}
export default Dashboard;
