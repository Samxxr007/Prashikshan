
import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: apiKey });

async function testGroq() {
    try {
        console.log("Testing Groq Connection...");
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Explain JSON in 5 words." }],
            model: "llama-3.1-70b-versatile",
        });

        console.log("Success!");
        console.log("Response:", chatCompletion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Groq Error Failed:", error);
    }
}

testGroq();
