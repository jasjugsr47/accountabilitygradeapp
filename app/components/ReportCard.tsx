import React, { useState } from 'react';
import Image from 'next/image';

const getGrade = (average: number): string => {
    if (average < 40) return "U";
    if (average < 45) return "E-";
    if (average < 50) return "E";
    if (average < 55) return "D-";
    if (average < 60) return "D";
    if (average < 65) return "C-";
    if (average < 70) return "C";
    if (average < 75) return "B-";
    if (average < 80) return "B";
    if (average < 85) return "A-";
    if (average < 90) return "A";
    if (average < 95) return "A*";
    return "A**";
};

const ReportCard: React.FC = () => {
    const [subject1, setSubject1] = useState(50);
    const [subject2, setSubject2] = useState(50);
    const [subject3, setSubject3] = useState(50);
    const [grade, setGrade] = useState<string | null>(null);
    const [average, setAverage] = useState<number | null>(null);

    const calculateAverage = () => {
        const calculatedAverage = (subject1 + subject2 + subject3) / 3;
        setAverage(calculatedAverage);
        setGrade(getGrade(calculatedAverage));
    };

    return (
        <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
            <Image
                alt=""
                src="/reportcardimage.jpg"
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                <div className="p-4 sm:p-6">
                    <h3 className="mt-0.5 text-lg text-white">Average: {average?.toFixed(2)} - Grade: {grade}</h3>

                    <div className="mt-4">
                        <label htmlFor="subject1" className="block text-sm font-medium text-white">Subject 1: {subject1}</label>
                        <input
                            type="range"
                            id="subject1"
                            min="0"
                            max="100"
                            value={subject1}
                            onChange={(e) => setSubject1(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="subject2" className="block text-sm font-medium text-white">Subject 2: {subject2}</label>
                        <input
                            type="range"
                            id="subject2"
                            min="0"
                            max="100"
                            value={subject2}
                            onChange={(e) => setSubject2(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="subject3" className="block text-sm font-medium text-white">Subject 3: {subject3}</label>
                        <input
                            type="range"
                            id="subject3"
                            min="0"
                            max="100"
                            value={subject3}
                            onChange={(e) => setSubject3(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add Questions
                    </button>
                    <button onClick={calculateAverage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Calculate Grade
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ReportCard;
