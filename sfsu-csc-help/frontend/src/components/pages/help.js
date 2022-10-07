import { useState } from "react";
import styles from "../../index.module.css";
import Navbar from "../NavBar.js";

const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.REACT_APP_OPENAI_API_KEY

const Help = (props) => {
    const [animalInput, setAnimalInput] = useState("");
    const [result, setResult] = useState();

    async function onSubmit(event) {
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
                'prompt': `Provide appropriate answers for the given questions and answer the folloup questions to previous question asked Question: What is your name? Answer: Hello! My name is GatorBuddy Question: ${animalInput } Answer:`,
                'temperature': 0.8,
                'max_tokens': 100,
                'top_p': 1,
                'frequency_penalty': 0,
                'presence_penalty': 0
            })
        });
        const data = await response.json();
        setResult(data.choices[0].text);
        setAnimalInput("");
    }

    return (
        <div>
            <Navbar />
            <main className={styles.main}>
                <h3>Type a Question to ask our AI</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="animal"
                        value={animalInput}
                        onChange={(e) => setAnimalInput(e.target.value)}
                    />
                    <input type="submit" value="Ask" />
                </form>
                <div className={styles.result}>{result}</div>
            </main>
        </div>
    );
}

export default Help;
