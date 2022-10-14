import { useState } from "react";
import styles from "../../index.module.css";
import Navbar from "../NavBar.js";
import Axios from "axios";

const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.REACT_APP_OPENAI_API_KEY

const Help = (props) => {
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState();
    const [feedback, setFeedback] = useState(false);
    const [feedbackUp, setFeedbackUp] = useState(false);
    const [feedbackDown, setFeedbackDown] = useState(false);

    async function thumbsUpFunction(event) {
        event.preventDefault();
        setFeedbackUp(true);
    }
    async function thumbsDownFunction(event) {
        event.preventDefault();
        setFeedbackDown(true);
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
                'model': 'text-davinci-002',
                'prompt': `Provide appropriate answers for the given questions and answer the followup questions to previous question asked Question: What is your name? Answer: Hello! My name is GatorBuddy Question: ${userInput} Answer:`,
                'temperature': 0.8,
                'max_tokens': 100,
                'top_p': 1,
                'frequency_penalty': 0,
                'presence_penalty': 0
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
        Axios.post('http://localhost:3003/questionRegister', {
            userName: "TBD",
            question: userInput,
            answer: result,
            feedback: feedbackData,
            
        }).then((response) => {
            console.log(response);
        });
        //window.location.href = '/help';
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
                                        <span class="thumb thumbs-up"><i onClick={thumbsUpFunction} class="bi bi-hand-thumbs-up"></i></span>
                                        <small class="fw-500">Yes</small>
                                    </div>
                                    <div class="col-md-6">
                                        <span class="thumb thumbs-down"><i onClick={thumbsDownFunction} class="bi bi-hand-thumbs-down"></i></span>
                                        <small class="fw-500">No</small>
                                    </div>
                                </div>
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
