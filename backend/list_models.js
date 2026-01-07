
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD1gv-5oeadrd9FwZNhmuLe-ZFsNmR_pjQ";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const fs = await import('fs');
        if (data.models) {
            let output = "MODELS FOUND:\n";
            data.models.forEach(m => output += m.name + "\n");
            await fs.promises.writeFile("models_clean.txt", output);
            console.log("Written to models_clean.txt");
        } else {
            console.log("No models found:", JSON.stringify(data));
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
