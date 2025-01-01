"use client";

import React, { useState, useEffect } from "react";

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

  // Fetch questions and grades from the database
  useEffect(() => {
    const fetchData = async () => {
      const questionResponse = await fetch("/api/questions");
      const questionsData = await questionResponse.json();
      setQuestions(questionsData);

      const gradesResponse = await fetch("/api/grades");
      const gradesData = await gradesResponse.json();
      setGrades(gradesData);
    };
    fetchData();
  }, []);

  // Add a new question to the database
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

  // Save grade to the database
  const saveGrade = async (questionId: number, score: number) => {
    const response = await fetch("/api/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, score }),
    });

    if (response.ok) {
      const savedGrade = await response.json();
      setGrades([...grades, savedGrade]);
    }
  };

  return (
    <main className="text-center text-white">
      <h1 className="text-3xl my-4">Grade App with Sliders and Swipeable Cards</h1>

      {/* Questions and Sliders */}
      <table className="w-full text-center bg-opacity-10 border border-white border-opacity-20">
        <thead>
          <tr>
            <th>Question</th>
            <th>Score (0-100)</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.text}</td>
              <td>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="slider"
                  onChange={(e) => saveGrade(q.id, parseInt(e.target.value, 10))}
                />
                <span>{grades.find((g) => g.questionId === q.id)?.score ?? 50}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add a new question */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Add a new question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 ml-2"
        >
          Add Question
        </button>
      </div>

      {/* Swipeable Cards for Grades */}
      <div className="mt-8 flex overflow-x-scroll">
        {grades.map((grade) => {
          const question = questions.find((q) => q.id === grade.questionId);
          return (
            <div
              key={grade.id}
              className="bg-gray-800 text-white p-4 m-2 rounded-lg shadow-md min-w-[200px]"
            >
              <h3 className="font-bold">{question?.text || "Unknown Question"}</h3>
              <p>Score: {grade.score}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
