"use client" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import DeleteQuizByIDButton from "./DeleteQuizByIdButton";
import UpdateQuizByIdButton from "./UpdateQuizByIdButton";

export default function QuizFull({ quizInfo }) {
    const [getStartedMessage, setGetStartedMessage] = useState(true);
    function handleStart() {
        setGetStartedMessage(false)
    }
    const [attempted, setAttempted] = useState(Array(quizInfo[0].questions.length).fill(false))
    const [attemptedNumber, setAttemptedNumber] = useState(0)
    function handleAttempt (index, isCorrect) {
        if (attempted[index] == 0) {
            let temporary = attempted
            temporary[index] = 1
            setAttempted(temporary)
            setAttemptedNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
    }
    const [score, setScore] = useState(Array(quizInfo[0].questions.length).fill(0))
    const [scoreNumber, setScoreNumber] = useState(0)
    function handleScore (index, isCorrect) {
        handleAttempt(index)
        if (isCorrect && attempted[index] == 0) {
            let temporary = score
            temporary[index] = 1
            alert(attempted)
            setScore(temporary)
            setScoreNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
    }


    let creationDay = `${-1 + Math.floor((new Date() - new Date("2024-06-19T11:25:32.505672+00:00")) / (1000 * 60 * 60 * 24))}`

    return (
        <>  
            {quizInfo.map((quiz) => (
                <div key={quiz.id} className="shadow-md rounded-lg p-4 m-2 border border-blue-300">
                    <h2 className="text-xl font-bold mb-4">Quiz: {quiz.name}</h2>
                    <p className="text-gray-600">{quiz.description}</p>
                    <div className="text-gray-400">Created: {creationDay == 0 ? "today!" : creationDay == 1 ? "1 day ago." : `${creationDay} days ago.`}</div>

                    <p className="text-gray-400">Plays Count: {quiz.playsCount}</p>
                    {getStartedMessage ? (<div onClick={handleStart}>Get started</div>) :(
                        <>
                            <div className="mt-4">
                                {quiz.questions.map((prompt, index) => (
                                    <div key={index} className="bg-yellow-100 p-2 rounded-lg my-2">
                                    <p className="text-gray-700">Q: {prompt.question}</p>
                                    <p className="text-gray-700 hover:bg-green-300 transition-colors duration-300" onClick={() => handleScore(index, true)}>A: {prompt.answer}</p>
                                    <p className="text-gray-700 hover:bg-green-300 transition-colors duration-300" onClick={() => handleScore(index, false)}>D: {prompt.decoy}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div>Your score: {scoreNumber}</div>
                    <div>Your attempts: {attemptedNumber}</div>

                    <UpdateQuizByIdButton></UpdateQuizByIdButton>
                    <DeleteQuizByIDButton></DeleteQuizByIDButton>
                </div>
            ))}
        </>
    )
}