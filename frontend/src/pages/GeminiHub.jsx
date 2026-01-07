import { useState, useEffect } from "react";
import API from "../api";

export default function GeminiHub() {
    const [skill, setSkill] = useState("");
    const [roadmap, setRoadmap] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [testActive, setTestActive] = useState(false);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    // New States for Roadmap 2.0
    const [completedSteps, setCompletedSteps] = useState([]); // Array of indices

    const loadSavedRoadmap = async (targetSkill) => {
        if (!targetSkill) return;
        try {
            const { data } = await API.get(`/ai/roadmap/${targetSkill}`);
            if (data && data.steps) {
                setRoadmap(data);
                // Rehydrate completed steps state
                const indices = data.steps.reduce((acc, step, i) => step.isCompleted ? [...acc, i] : acc, []);
                setCompletedSteps(indices);
                return true;
            }
        } catch (err) {
            console.log("No saved roadmap found.");
        }
        return false;
    };

    const handleGenerateRoadmap = async () => {
        if (!skill) return;
        setLoading(true);
        setRoadmap(null);
        setQuiz(null);
        setScore(null);
        setCompletedSteps([]);

        // 1. Try to load saved roadmap first
        const loaded = await loadSavedRoadmap(skill);
        if (loaded) {
            setLoading(false);
            return;
        }

        // 2. Generate New if not found
        try {
            const { data } = await API.post("/ai/roadmap", { skill });
            setRoadmap(data);
            // Autosave initial state
            await API.post("/ai/roadmap/save", { skill: data.skill, steps: data.steps });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "AI Hub encountered an error. Check configuration.");
        } finally {
            setLoading(false);
        }
    };

    const toggleStepCompletion = async (index) => {
        const isCompleted = completedSteps.includes(index);
        let newCompleted;
        if (isCompleted) {
            newCompleted = completedSteps.filter(i => i !== index);
        } else {
            newCompleted = [...completedSteps, index];
        }
        setCompletedSteps(newCompleted);

        // Optimistic update of local roadmap state
        const updatedSteps = roadmap.steps.map((s, i) => i === index ? { ...s, isCompleted: !isCompleted } : s);
        setRoadmap({ ...roadmap, steps: updatedSteps });

        // Save to Backend
        try {
            await API.post("/ai/roadmap/save", { skill: roadmap.skill, steps: updatedSteps });
        } catch (err) {
            console.error("Failed to save progress");
        }
    };

    const allStepsCompleted = roadmap && roadmap.steps.length > 0 && completedSteps.length === roadmap.steps.length;

    const handleStartTest = async () => {
        if (!allStepsCompleted) {
            alert("You must complete ALL roadmap milestones before unlocking the Mastery Test.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await API.post("/ai/test", { skill });
            setQuiz(data);
            setTestActive(true);
            setAnswers({});
            setScore(null);
        } catch (err) {
            alert("Failed to generate test.");
        } finally {
            setLoading(false);
        }
    };

    const runCodeTest = (studentCode, testCases) => {
        try {
            const fn = new Function(`return ${studentCode}`)();
            return testCases.every(tc => {
                const result = fn(...tc.input);
                return JSON.stringify(result) === JSON.stringify(tc.expectedOutput);
            });
        } catch (e) {
            return false;
        }
    };

    const handleSubmitTest = async () => {
        let totalScore = 0;
        quiz.forEach((q, i) => {
            if (q.type === "mcq") {
                if (answers[i] === q.answer) totalScore++;
            } else if (q.type === "coding") {
                if (runCodeTest(answers[i], q.testCases)) totalScore++;
            }
        });

        setScore(totalScore);
        setTestActive(false);

        // Save to Profile ONLY if >= 80% (16/20)
        if (totalScore >= 16) {
            try {
                await API.post("/ai/save-mastery", { skill, score: totalScore });
            } catch (err) {
                console.error("Failed to save mastery results.");
            }
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
                    Gemini AI Roadmap 2.0 <span className="text-emerald-500">🚀</span>
                </h1>
                <p className="text-slate-400 font-medium">Your persistent journey to mastery. Complete every step to verify your skills.</p>
            </div>

            {/* Search Section */}
            <div className="relative group max-w-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex gap-3 bg-slate-900/80 border border-slate-700/50 p-2 rounded-2xl backdrop-blur-xl">
                    <input
                        type="text"
                        placeholder="Search Skill (e.g. Python, React, Data Structures)"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-slate-600"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                    />
                    <button
                        onClick={handleGenerateRoadmap}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Load Roadmap"}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="p-20 text-center flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-6" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Architecting your deep-dive path...</p>
                </div>
            )}

            {/* Roadmap View */}
            {roadmap && !testActive && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4 space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="sticky top-0 bg-slate-950/90 backdrop-blur-sm z-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 px-4 border-b border-slate-800">
                            Your Progress ({Math.round((completedSteps.length / roadmap.steps.length) * 100)}%)
                        </h3>
                        <div className="space-y-2">
                            {roadmap.steps.map((step, i) => (
                                <div key={i} className="flex gap-2">
                                    <button
                                        onClick={() => toggleStepCompletion(i)}
                                        className={`mt-3 w-6 h-6 rounded border flex items-center justify-center transition-all ${completedSteps.includes(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 hover:border-slate-500 bg-slate-900'
                                            }`}
                                    >
                                        {completedSteps.includes(i) && <span>✓</span>}
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(i)}
                                        className={`flex-1 text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${currentStep === i
                                            ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10'
                                            : 'bg-slate-900/40 border-slate-800/50 text-slate-400 hover:bg-slate-800/50'
                                            }`}
                                    >
                                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${currentStep === i ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="font-bold text-sm truncate">{step.title}</p>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{completedSteps.includes(i) ? 'Completed' : 'Pending'}</p>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 sticky bottom-0 bg-slate-950/90 backdrop-blur-sm z-10 py-4 border-t border-slate-800">
                            <button
                                onClick={handleStartTest}
                                disabled={!allStepsCompleted}
                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all
                    ${allStepsCompleted
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/20 hover:brightness-110'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed grayscale'}`}
                            >
                                {allStepsCompleted ? "Unlock Mastery Test 🏆" : "Complete All Steps to Unlock Test 🔒"}
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">📖</span>
                                <div>
                                    <h2 className="text-3xl font-black text-white italic">{roadmap.steps[currentStep].title}</h2>
                                    <p className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mt-1">Core Specification</p>
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-950/60 border border-slate-800/50">
                                <p className="text-slate-300 leading-relaxed text-lg italic">"{roadmap.steps[currentStep].specifications}"</p>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Study Resources & Content 📥</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {roadmap.steps[currentStep].resources.map((res, ri) => (
                                        <a
                                            key={ri}
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/30 hover:border-blue-500/30 transition-all group block"
                                        >
                                            <p className="text-slate-200 font-bold text-sm mb-2">{res.name}</p>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:text-blue-400">Launch Content →</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Test Section */}
            {testActive && quiz && (
                <div className="max-w-5xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 pb-20">
                    <div className="p-10 rounded-[2.5rem] bg-slate-900/60 border border-slate-800/50 backdrop-blur-xl shadow-2xl">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Final Mastery Assessment: {skill}</h2>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">20 Questions • 80% Passing Score Required</p>
                        </div>

                        <div className="space-y-16">
                            {quiz.map((q, i) => (
                                <div key={i} className="space-y-6 border-b border-slate-800/50 pb-10 last:border-0">
                                    <div className="flex gap-4">
                                        <span className="text-slate-700 font-black text-2xl">Q{i + 1}.</span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-white text-lg font-medium leading-relaxed">{q.question}</p>
                                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${q.type === 'coding' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'}`}>
                                                    {q.type === 'coding' ? 'Coding Challenge' : 'Concept MCQ'}
                                                </span>
                                            </div>

                                            {q.type === "mcq" ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    {q.options.map((opt, oi) => (
                                                        <button
                                                            key={oi}
                                                            onClick={() => setAnswers({ ...answers, [i]: opt })}
                                                            className={`p-4 rounded-xl text-left text-sm font-semibold border transition-all ${answers[i] === opt
                                                                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                                                : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="mt-4 space-y-4">
                                                    <div className="relative group">
                                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition"></div>
                                                        <textarea
                                                            className="relative w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-sm text-purple-300 focus:border-purple-500 focus:ring-0"
                                                            defaultValue={q.starterCode}
                                                            onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                                                            spellCheck="false"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                                                        <span>Output Type: {q.testCases[0]?.expectedOutput?.constructor?.name || 'Any'}</span>
                                                        <span className="italic">Passes hidden test cases automatically on submit</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 pt-10 border-t border-slate-800/50 flex flex-col items-center sticky bottom-0 bg-slate-900/90 backdrop-blur pb-4">
                            <button
                                onClick={handleSubmitTest}
                                className="px-12 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                            >
                                Submit Final Exam
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Result View */}
            {score !== null && !testActive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
                    <div className={`max-w-xl w-full p-12 text-center rounded-[3rem] border shadow-2xl animate-in zoom-in-75 duration-500 ${score >= 16 ? 'bg-slate-900 border-emerald-500/50 shadow-emerald-500/20' : 'bg-slate-900 border-red-500/50 shadow-red-500/20'
                        }`}>
                        <div className="text-8xl mb-6">{score >= 16 ? '🏆' : '📚'}</div>
                        <h2 className="text-5xl font-black text-white italic mb-2">{score}/20</h2>
                        <p className={`font-bold uppercase tracking-widest text-sm mb-8 ${score >= 16 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {score >= 16 ? "Mastery Verification Successful!" : `Verification Failed (${Math.round((score / 20) * 100)}%)`}
                        </p>
                        <p className="text-slate-400 mb-10 text-sm leading-relaxed">
                            {score >= 16
                                ? "Congratulations! Because you achieved >80%, this skill has been permanently added to your verified profile."
                                : "You need at least 80% (16/20) to verify this skill. Please review the roadmap materials and try again."}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => { setScore(null); setRoadmap(null); setSkill(""); setCompletedSteps([]); }}
                                className="flex-1 py-4 rounded-2xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-all"
                            >
                                New Goal
                            </button>
                            <button
                                onClick={handleGenerateRoadmap}
                                className="flex-1 py-4 rounded-2xl bg-white text-slate-900 font-black text-sm hover:bg-slate-200 transition-all"
                            >
                                Back to Roadmap
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
