import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

import { db } from "../firebase.js";
const roadmaps = db.collection("roadmaps");
const studentProfiles = db.collection("studentProfiles");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateRoadmap = async (req, res) => {
    try {
        const { skill } = req.body;
        if (!skill) return res.status(400).json({ error: "Skill is required" });

        const prompt = `
      You are an expert career counselor and tutor. 
      Generate a COMPREHENSIVE, DEEP-DIVE learning roadmap for a student to master the skill: "${skill}".
      
      The roadmap MUST have between 8 to 10 steps, progressing from "Absolute Beginner" to "Industry Expert".
      
      For each step, include:
      1. Step Title
      2. Detailed Specifications (What to learn specifically).
      3. Free Content/Study Resources (Direct links).
      
      Formatting: Return the response in a structured JSON format like this:
      {
        "skill": "${skill}",
        "steps": [
          {
            "title": "Module 1: ...",
            "specifications": "...",
            "resources": [{ "name": "...", "url": "..." }],
            "isCompleted": false
          },
          ...
        ]
      }
    `;

        let cleanJson;
        let aiSuccess = false;
        let lastError;

        // Debug logging
        console.log("Checking Groq Key:", process.env.GROQ_API_KEY ? "Exists" : "Missing");

        // Try AI Generation First
        // Try AI Generation First
        const fs = await import('fs');
        fs.appendFileSync('debug_log.txt', `\n[${new Date().toISOString()}] processing request for: ${skill}\n`);

        if (true) {
            try {
                fs.appendFileSync('debug_log.txt', 'Entering Try Block\n');

                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a helpful assistant that outputs strictly in JSON." },
                        { role: "user", content: prompt }
                    ],
                    model: "llama-3.1-8b-instant",
                    temperature: 0.5,
                    response_format: { type: "json_object" }
                });

                fs.appendFileSync('debug_log.txt', 'Groq Call Completed\n');

                const content = completion.choices[0]?.message?.content || "{}";
                fs.appendFileSync('debug_log.txt', `Content received length: ${content.length}\n`);

                cleanJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
                aiSuccess = true;
                fs.appendFileSync('debug_log.txt', 'Success set to true\n');
            } catch (error) {
                fs.appendFileSync('debug_log.txt', `Cached Error: ${error.message}\n`);
                console.warn("Groq AI Generation Failed. Falling back.", error.message);
                lastError = error.message;
            }
        }

        // Fallback to Mock Data if AI failed
        if (!aiSuccess) {
            const debugMsg = lastError ? ` (Error: ${lastError.substring(0, 50)}...)` : " (Demo Mode)";
            cleanJson = JSON.stringify({
                skill: skill,
                steps: [
                    {
                        title: `Module 1: Foundations & Setup${debugMsg}`,
                        specifications: `Deep dive into ${skill} syntax, variables, and environment configuration.`,
                        resources: [{ name: "Official Docs", url: "https://google.com" }, { name: "Crash Course", url: "https://youtube.com" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 2: Control Flow & Logic",
                        specifications: "Mastering loops, conditionals, and error handling patterns.",
                        resources: [{ name: "Logic Training", url: "https://leetcode.com" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 3: Data Structures",
                        specifications: "Arrays, Objects, Maps, and Sets deep dive.",
                        resources: [{ name: "DS Guide", url: "https://geeksforgeeks.org" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 4: Functions & Scope",
                        specifications: "Closures, callbacks, and advanced function patterns.",
                        resources: [{ name: "MDN Functions", url: "https://developer.mozilla.org" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 5: Async Programming",
                        specifications: "Promises, Async/Await, and Event Loop mastery.",
                        resources: [{ name: "Async JS", url: "https://javascript.info" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 6: DOM & APIs",
                        specifications: "Manipulating the DOM and fetching external data.",
                        resources: [{ name: "Fetch API", url: "https://google.com" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 7: Modern Frameworks",
                        specifications: "Introduction to ecosystem tools and build systems.",
                        resources: [{ name: "Vite Guide", url: "https://vitejs.dev" }],
                        isCompleted: false
                    },
                    {
                        title: "Module 8: Final Capstone",
                        specifications: "Build a complete production-grade application.",
                        resources: [{ name: "Project Ideas", url: "https://github.com" }],
                        isCompleted: false
                    }
                ]
            });
        }

        res.json(JSON.parse(cleanJson));
    } catch (err) {
        console.error("Critical Error in Roadmap Gen:", err);
        res.status(500).json({ error: "Failed to generate roadmap." });
    }
};

export const generateQuiz = async (req, res) => {
    try {
        const { skill } = req.body;
        if (!skill) return res.status(400).json({ error: "Skill is required" });

        const prompt = `
      Generate a RIGOROUS mastery test for the skill: "${skill}".
      Include EXACTLY 20 questions.
      - 10 Multiple Choice Questions (MCQs) testing deep concepts.
      - 10 Coding Challenges testing implementation.
      
      For Coding Challenges, provide:
      - A "problem" description.
      - "starterCode" (function signature).
      - "testCases" (array of {input, expectedOutput}).
      
      Return the response STRICTLY as a JSON array of objects:
      [
        {
          "type": "mcq",
          "question": "The question text...",
          "options": ["A", "B", "C", "D"],
          "answer": "Correct Option",
          "explanation": "..."
        },
        {
          "type": "coding",
          "question": "The problem description...",
          "starterCode": "function solution(n) { \n  // write code \n }",
          "testCases": [
            { "input": [5], "expectedOutput": 25 },
            { "input": [10], "expectedOutput": 100 }
          ]
        }
      ]
    `;

        let cleanJson;
        let aiSuccess = false;
        let lastError;

        if (true) {
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a helpful assistant that outputs strictly in JSON array format." },
                        { role: "user", content: prompt }
                    ],
                    model: "llama-3.1-8b-instant",
                    temperature: 0.5,
                    response_format: { type: "json_object" }
                });

                const content = completion.choices[0]?.message?.content || "[]";
                // Llama with json_object mode might return object wrapped like { "questions": [...] }, or raw array.
                // We better ask prompt to return object or handle it.
                // However, let's keep it simple. If json_object is set, it validates JSON.
                cleanJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
                aiSuccess = true;
            } catch (err) {
                console.warn("Quiz Gen Failed. Falling back.", err.message);
                lastError = err.message;
            }
        }

        if (!aiSuccess) {
            cleanJson = JSON.stringify([
                {
                    type: "mcq",
                    question: `Fallback MCQ: Logic check for ${skill}? (Demo Mode)`,
                    options: ["Correct", "Wrong", "Wrong", "Wrong"],
                    answer: "Correct",
                    explanation: "Demo mode fallback."
                }
            ]);
            // Generate full mock set if needed, but for now fallback is clear.
            const mockQuestions = [];
            for (let i = 1; i <= 10; i++) {
                mockQuestions.push({
                    type: "mcq",
                    question: `Mock MCQ Question ${i} about ${skill}? (Demo Mode)`,
                    options: ["Correct Answer", "Wrong A", "Wrong B", "Wrong C"],
                    answer: "Correct Answer",
                    explanation: "This is the correct answer because..."
                });
            }
            for (let i = 1; i <= 10; i++) {
                mockQuestions.push({
                    type: "coding",
                    question: `Coding Task ${i}: Write a function 'f${i}' that returns ${i}.`,
                    starterCode: `function f${i}() { \n  return 0; \n}`,
                    testCases: [{ input: [], expectedOutput: i }]
                });
            }
            cleanJson = JSON.stringify(mockQuestions);
        }

        // Ensure we parse correctly. Sometimes wrappers exist.
        // We will try parsing.
        let jsonData = JSON.parse(cleanJson);
        // If wrapped in object keys, try to extract array if possible, else return as is.
        if (!Array.isArray(jsonData) && jsonData.questions) {
            jsonData = jsonData.questions;
        } else if (!Array.isArray(jsonData) && jsonData.steps) {
            // Shouldn't happen for quiz but just in case
            // do nothing
        }

        res.json(jsonData);
    } catch (err) {
        console.error("Groq Error:", err);
        res.status(500).json({ error: "Failed to generate test. Please try again." });
    }
};

export const saveRoadmapProgress = async (req, res) => {
    try {
        const { skill, steps } = req.body;
        const email = req.user.email;
        const docId = `${email}_${skill.toLowerCase().replace(/\s+/g, '-')}`;

        await roadmaps.doc(docId).set({
            email,
            skill,
            steps,
            lastUpdated: new Date().toISOString()
        }, { merge: true });

        res.json({ msg: "Progress saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getSavedRoadmap = async (req, res) => {
    try {
        const { skill } = req.params;
        const email = req.user.email;
        const docId = `${email}_${skill.toLowerCase().replace(/\s+/g, '-')}`;

        const doc = await roadmaps.doc(docId).get();
        if (!doc.exists) return res.json(null);

        res.json(doc.data());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const saveMastery = async (req, res) => {
    try {
        const { skill, score } = req.body;
        const email = req.user.email;

        if (!skill || score === undefined) return res.status(400).json({ msg: "Missing data" });

        const docRef = studentProfiles.doc(email);
        const doc = await docRef.get();

        let masteredSkills = [];
        if (doc.exists) {
            masteredSkills = doc.data().masteredSkills || [];
        }

        const existingIndex = masteredSkills.findIndex(s => s.skill.toLowerCase() === skill.toLowerCase());
        if (existingIndex > -1) {
            masteredSkills[existingIndex] = { skill, score, date: new Date().toISOString() };
        } else {
            masteredSkills.push({ skill, score, date: new Date().toISOString() });
        }

        await docRef.set({ masteredSkills }, { merge: true });
        res.json({ msg: "Mastery saved!", masteredSkills });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
