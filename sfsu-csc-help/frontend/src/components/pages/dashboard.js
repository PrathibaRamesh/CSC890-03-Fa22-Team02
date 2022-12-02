import Navbar from "../NavBar.js";
import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = (props) => {
    const { SearchBar } = Search;
    const myuuid = uuidv4();

    window.history.forward();
    var globalVar = window.sessionStorage;
    var userRole = globalVar.getItem("userRole");
    var loggedname = globalVar.getItem("username");

    const [data, setData] = useState([]);
    var columns = [];
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios.post('/getFeedbackData', {
            userRole: userRole,
            username: loggedname,
        }).then((response) => {

            //console.log(response.data);
            //console.log(userRole);

            if (response.data.message == "No data available!!") {
                alert("No data available to show!!");
                window.location.href = '/home';
            }
            else {
                var newData = response.data.map((data) => {
                    data.id = myuuid;
                    return data;
                });
                console.log(newData);
                setData(newData);
            }
        });
    };
    if (userRole == "General User") {
        columns = [
            {
                dataField: "username",
                text: "Student ID",
                sort: true,
                align: 'center',
                headerAlign: 'center',
                filter: textFilter(),
            },
            {
                dataField: "question",
                text: "Question",
                headerAlign: 'center'
            },
            {
                dataField: "answer",
                text: "Answer",
                headerAlign: 'center'
            },
        ];
    }
    else {
        columns = [
            {
                dataField: "username",
                text: "Student ID",
                sort: true,
                align: 'center',
                headerAlign: 'center',
                filter: textFilter(),
                headerClasses: 'demo-row-odd'
            },
            {
                dataField: "question",
                text: "Question",
                headerAlign: 'center'
            },
            {
                dataField: "answer",
                text: "Answer",
                headerAlign: 'center'
            },
            {
                dataField: "feedback",
                text: "Feedback",
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: "rating",
                text: "Rating",
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: "comment",
                text: "Comment",
                headerAlign: 'center'
            },
        ];
    }
    
    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <br />

             <ToolkitProvider
                keyField="id"
                data={data}
                columns={columns}
                search
            >
            {
                props => (
                    <div>
                        <BootstrapTable
                            keyField="id"
                            data={data}
                            columns={columns}
                            headerClasses="header-class"
                            headerWrapperClasses="foo"
                            striped
                            hover
                            condensed
                            pagination={paginationFactory()}
                            filter={filterFactory()}
                        />
                    </div>
                )
            }
            </ToolkitProvider>
            {/*{userRole === "General User" ? (*/}
            {/*<div>*/}
            {/*    <ReactBootStrap.Table striped bordered hover>*/}
            {/*        <thead>*/}
            {/*            <tr>*/}
            {/*                <th>Student ID</th>*/}
            {/*                <th>Question</th>*/}
            {/*                <th>Answer</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*            {posts.blogs &&*/}
            {/*                posts.blogs.map((item) => (*/}
            {/*                    <tr key={item.username}>*/}
            {/*                        <td>{item.username}</td>*/}
            {/*                        <td>{item.question}</td>*/}
            {/*                        <td>{item.answer}</td>*/}
            {/*                    </tr>*/}
            {/*                ))}*/}
            {/*        </tbody>*/}
            {/*    </ReactBootStrap.Table>*/}
            {/*</div>*/}
            {/*) : (*/}
            {/*        <div>*/}
            {/*            <ReactBootStrap.Table striped bordered hover>*/}
            {/*                <thead>*/}
            {/*                    <tr>*/}
            {/*                        <th>Student ID</th>*/}
            {/*                        <th>Question</th>*/}
            {/*                        <th>Answer</th>*/}
            {/*                        <th>Feedback</th>*/}
            {/*                        <th>Rating</th>*/}
            {/*                        <th>Comment</th>*/}
            {/*                    </tr>*/}
            {/*                </thead>*/}
            {/*                <tbody>*/}
            {/*                    {posts.blogs &&*/}
            {/*                        posts.blogs.map((item) => (*/}
            {/*                            <tr key={item.username}>*/}
            {/*                                <td>{item.username}</td>*/}
            {/*                                <td>{item.question}</td>*/}
            {/*                                <td>{item.answer}</td>*/}
            {/*                                <td>{item.feedback}</td>*/}
            {/*                                <td>{item.rating}</td>*/}
            {/*                                <td>{item.comment}</td>*/}
            {/*                            </tr>*/}
            {/*                        ))}*/}
            {/*                </tbody>*/}
            {/*            </ReactBootStrap.Table>*/}
            {/*        </div>*/}
            {/*)}*/}

        </div>
    );
}
export default Dashboard;
