import { useState } from "react";
import styles from "../../index.module.css";
import Navbar from "../NavBar.js";
import Axios from "axios";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const Help = (props) => {
    window.history.forward();
    const [userInput, setUserInput] = useState("");
    const [userComments, setuserComments] = useState("");
    const [result, setResult] = useState();
    const [feedback, setFeedback] = useState(false);
    const [feedbackUp, setFeedbackUp] = useState(false);
    const [feedbackDown, setFeedbackDown] = useState(false);
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [isActiveDown, setIsActiveDown] = useState(false);
    const [isActiveUp, setIsActiveUp] = useState(false);
    var globalVar = window.sessionStorage;
    var loggedname = globalVar.getItem("username");
    var userRole = globalVar.getItem("userRole");

    async function thumbsUpFunction(event) {
        event.preventDefault();
        setFeedbackUp(true);
        setIsActiveUp(true);
        setIsActiveDown(false);
    }
    async function thumbsDownFunction(event) {
        event.preventDefault();
        setFeedbackDown(true);
        setIsActiveDown(true);
        setIsActiveUp(false);
    }

    async function onAskQuestion(event) {
        event.preventDefault();
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            // body: '{\n  "model": "text-davinci-002",\n  "prompt": "",\n  "temperature": 0.7,\n  "max_tokens": 256,\n  "top_p": 1,\n  "frequency_penalty": 0,\n  "presence_penalty": 0\n}',
            body: JSON.stringify({
                'model': 'davinci:ft-personal-2022-10-30-00-57-34',
                'prompt': `Provide an appropriate answer for the given question Question: ${userInput} Answer:`,
                'temperature': 0.8,
                'max_tokens': 100,
                'top_p': 1,
                'frequency_penalty': 0,
                'presence_penalty': 0,
                'stop': '\n'
            })
        });
        const data = await response.json();
        setResult(data.choices[0].text);
        setUserInput(userInput);
        setFeedback(true);
    }

    async function onSubmit(event) {
        event.preventDefault();
        console.log(props.data);
        const feedbackData = (feedbackUp ? 'yes' : ((feedbackDown) ? 'No' : null));
        console.log(feedbackData);
        Axios.post('/questionRegister', {
            userName: loggedname,
            question: userInput,
            answer: result,
            feedback: feedbackData,
            rating: value,
            comment: userComments,
            userRole: userRole
            
        }).then((response) => {
            console.log(response);
        });
        window.location.href = '/help';
    }

    const labels = {
        1: 'Poor',
        2: 'Ok',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

        return (
            <div>
                <Navbar />
                <main className={styles.main}>
                    <br />
                    <br />
                    <br />
                    <h3>Type a Question to ask our AI</h3>
                    <form onSubmit={onAskQuestion}>
                        <input
                            type="text"
                            name="animal"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <input type="submit" value="Ask" />
                    </form>
                    <div className={styles.result}>
                        {result}
                    </div>
                    {feedback ? (
                        <div>
                        <div class="container d-flex justify-content-center mt-5">
                            <div class="card text-center mb-5">
                                <div class="circle-image">
                                    <img src="https://i.imgur.com/39fcglK.png" width="50" />
                                </div>
                                <small class="help-text mb-1 text-black-50">Help us improve</small>
                                <span class="fw-500">Are you satisfied with the answer?</span>
                                <div class="row mb-5 mt-5">
                                    <div class="col-md-6">
                                            <span class="thumb thumbs-up" style={{
                                                backgroundColor: isActiveUp ? 'green' : '',
                                                color: isActiveUp ? 'white' : '',
                                            }}><i onClick={thumbsUpFunction} class="bi bi-hand-thumbs-up"></i></span>
                                            <small class="fw-500">&nbsp; Yes</small>
                                    </div>
                                    <div class="col-md-6">
                                            <span class="thumb thumbs-down" style={{
                                                backgroundColor: isActiveDown ? 'red' : '',
                                                color: isActiveDown ? 'white' : '',
                                            }}><i onClick={thumbsDownFunction} class="bi bi-hand-thumbs-down"></i></span>
                                        <small class="fw-500">&nbsp;  No</small>
                                    </div>
                                    </div>
                                    <div class="container d-flex justify-content-center">
                                        <Rating
                                            name="hover-feedback"
                                            value={value}
                                            getLabelText={getLabelText}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                setHover(newHover);
                                            }}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        {value !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                        )}
                                    </div>
                                    <br />
                                    <div class="container d-flex justify-content-center">
                                        <input
                                            type="text"
                                            name="comments"
                                            placeholder="comments if any"
                                            value={userComments}
                                            onChange={(e) => setuserComments(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                </div>

                            </div>
                           
                            <div className={styles.main}>
                                <form onSubmit={onSubmit}>
                                    <input type="submit" value="Next Question" />
                                </form>
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>

                    ) : (
                        null
                    )}
                </main>
            </div>

        );
}

export default Help;
