import { Configuration, OpenAIApi } from "openai";
/*const openai = new OpenAI(process.env.OPENAI_API_KEY);*/
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default async (req, res) =>
    {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generatePrompt(req.body.animal),
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
    //const capitalizedAnimal =
    //  animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Provide appropriate answers for the given questions
Question: Where is Chennai located?
Answer: TamilNadu, India
Question: ${animal}
Answer:`;
}
