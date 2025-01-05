"use client";

import React, { useState, useEffect } from "react";
import VantaBackground from "./components/VantaBackground";

interface Question {
  id: number;
  text: string;
}

interface Grade {
  id: number;
  questionId: number;
  score: number;
  question?: Question;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [sliderValues, setSliderValues] = useState<Record<number, number>>({});
  const [shouldCalculate, setShouldCalculate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const questionResponse = await fetch("/api/questions");
      const questionsData = await questionResponse.json();
      setQuestions(questionsData);
    };
    fetchData();
  }, []);

  const addQuestion = async () => {
    if (!newQuestion.trim()) return;

    const response = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newQuestion }),
    });

    if (response.ok) {
      const savedQuestion = await response.json();
      setQuestions([...questions, savedQuestion]);
      setNewQuestion("");
    }
  };

  const calculateGrade = async () => {
    console.log("Calculating grade...");
    setShouldCalculate(true);
    // Save grades to the API
    for (const questionId in sliderValues) {
      const score = sliderValues[questionId];
      await fetch("/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: parseInt(questionId), score }),
      });
    }

    // Fetch grades after saving
    const gradesResponse = await fetch("/api/grades");
    const gradesData = await gradesResponse.json();
    setGrades(gradesData);
  };

  return (
    <VantaBackground>
      <main className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Accountability Grade App</h1>

        {/* Questions and Sliders */}
        <table className="w-full text-left bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-4 text-gray-400">Question</th>
              <th className="p-4 text-gray-400">Score (0-100)</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t border-gray-700">
                <td className="p-4">{q.text}</td>
                <td className="p-4 flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValues[q.id] || 50}
                    className="slider w-full"
                    onChange={(e) => {
                      const score = parseInt(e.target.value, 10);
                      setSliderValues((prev) => ({ ...prev, [q.id]: score }));
                    }}
                  />
                  <span>{sliderValues[q.id] || 50}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculate Grade Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={calculateGrade}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Calculate Grade
          </button>
        </div>

        {/* Add a New Question */}
        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Add a new question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
          />
          <button
            onClick={addQuestion}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Add Question
          </button>
        </div>

        {/* Swipeable Cards for Grades */}
        {shouldCalculate && (
          <div className="mt-8 flex overflow-x-scroll space-x-4">
            {grades.map((grade) => {
              const question = questions.find((q) => q.id === grade.questionId);
              return (
                <div
                  key={grade.id}
                  className="bg-gray-800 text-white p-6 rounded-lg shadow-md min-w-[200px]"
                >
                  <h3 className="font-bold">{question?.text || "Unknown Question"}</h3>
                  <p>Score: {grade.score}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </VantaBackground>
  );
}
