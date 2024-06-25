"use client" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteQuizByIDButton from "./DeleteQuizByIdButton";
import UpdateQuizByIdButton from "./UpdateQuizByIdButton";
import {getCreationDay} from "../helper.js"
import Popup from "./Popup";

export default function QuizFull({ quizInfo }) {
    let quizLength = quizInfo.questions.length
    const [score, setScore] = useState(Array(quizLength).fill(0))
    const [scoreNumber, setScoreNumber] = useState(0)
    const [attempted, setAttempted] = useState(Array(quizLength).fill(false))
    const [attemptedNumber, setAttemptedNumber] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responseMessage, setResponseMessage] = useState(Array(quizLength).fill(""))
    const [displayList, setDisplayList] = useState(false)
    const [randomAnswerOrderArray, setRandomAnswerOrderArray] = useState(Array(quizLength).fill(0))
    useEffect(() => {
        let temporary = randomAnswerOrderArray
        for (let i = 0; i <= quizLength; i++) {
            temporary[i] = (Math.floor(Math.random() * 2))
        }
        setRandomAnswerOrderArray(temporary)
    }, []);
    
    
    function handleAttempt (index) {
        if (attempted[index] == 0) {
            let temporary = attempted
            temporary[index] = 1
            setAttempted(temporary)
            setAttemptedNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
    }
    function handleScore (index, isCorrect) {
        if (isCorrect && attempted[index] == 0) {
            let temporary = score
            temporary[index] = 1
            setScore(temporary)
            setScoreNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
        adjustResponseMessage(isCorrect, index)
        handleAttempt(index)
        if (attemptedNumber == quizLength-1) {
            setTimeout(() => {
                setPopupDisplay(true)
            }, 3000); // 1000 milliseconds = 1 second
            }
    }
    function handleNextQuestion (index) {
        if (currentQuestionIndex < quizLength -1) {
            setCurrentQuestionIndex(prev => prev+1)
        }
    }
    function handlePreviousQuestion (index) {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev-1)
        }
    }
    function toggleDisplay () {
        setDisplayList(prev => !prev)
    }
    function adjustResponseMessage(isCorrect, respectiveIndex) {
        let temporary = responseMessage
        const correctMessages = ["Great job!", "You're on fire!", "Absolutely right!"];
        const incorrectMessages = ["Oops, try again!", "Not quite!", "Unlucky!"];
        if(temporary[respectiveIndex] == "") {
            if (isCorrect) {
              const randomIndex = Math.floor(Math.random() * correctMessages.length);
              temporary[respectiveIndex] = correctMessages[randomIndex]
              setResponseMessage(temporary);
            } else {
              const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
              temporary[respectiveIndex] = incorrectMessages[randomIndex]
              setResponseMessage(temporary);
            }
        }
    }
    const [popupDisplay, setPopupDisplay] = useState(false)
    function hidePopup () {
        setPopupDisplay(false)
        setDisplayList(true)
    }
    let progressBarWidth = `${100 / quizLength}%`

    return (
        <> 
            {/* PROGRESS BAR */}
            <section className="animate-in min-w-full h-1 flex bg-gray-800 rounded-lg">
                {score.map((result, bla) => (
                    <div key={bla} className={score[bla] === 1 ? "bg-green-500" : (attempted[bla] === 1 ? "bg-orange-400" : "bg-white")} style={{ width: progressBarWidth }}>
                    </div>
                ))}
            </section>

            {/* MAIN BODY---------------------------------------------------------------------------- */}
            { popupDisplay? 
                (<div>
                    <Popup score={scoreNumber} quizLength={quizLength}></Popup>
                    <div className="flex justify-between">
                        <button onClick={hidePopup} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500 text-center">Review answers</button>
                        <Link href={`/yourspace`} className="whitespace-nowrap left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-blue-900 hover:bg-btn-background-hover flex items-center group text-sm">Your space</Link>

                    </div>
                </div>):
                (<>
                    <div className="animate-in flex-1 flex flex-col gap-5 opacity-0 px-3 mt-5 mb-5 max-w-screen-lg w-5/6">
                            <div key={quizInfo.id} className="shadow-md rounded-lg p-4 m-2 border border-blue-300">
                                {/* <UpdateQuizByIdButton></UpdateQuizByIdButton> */}
                                {/* <DeleteQuizByIDButton></DeleteQuizByIDButton>    */}
                                <section className="flex justify-between">
                                    <h2 className="text-xl font-bold mb-4">{quizInfo.name}
                                        <p className="text-sm font-normal">{quizInfo.description}</p>
                                    </h2>

                                    <div className="flex items-center justify-right bg-blue-900 rounded-lg cursor-pointer text-xs" onClick={toggleDisplay}>
                                        <span className="ml-2 pr-2">List view </span>
                                        <div className={`w-9 h-5 rounded-full p-1  ${displayList ? 'bg-green-500' : 'bg-blue-500'}`}  >
                                            <div className={`w-3 h-3 bg-white rounded-full shadow-md transform ${displayList ? 'translate-x-full' : ''}`}></div>
                                        </div>
                                    </div>    
                                    {/* SCORE TRACKERS ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                                    <div>
                                        <div>Score: {scoreNumber} / {quizLength}</div>
                                        <div>Questions remaining: {quizLength - attemptedNumber}</div>
                                    </div>
                                </section>

                                {/* QUESTIONS BLOCK------------------------------------------------------------------------------------------------------------------------------------- */}
                                <section className="mt-4">
                                    {displayList ? 
                                // LIST OF QUESTIONS ----------------------------------------------------------------------------

                                        (<>
                                        {quizInfo.questions.map((prompt, index) => (
                                            <section key={index} className="bg-gray-800 p-10 rounded-lg my-2">
                                                <p className="text-center text-gray-100 pb-5">Q{index+1}: {prompt.question}</p>
                                                {/* ANSWER RANDOMISATION ------- */}
                                                { randomAnswerOrderArray[index] == 1 ? (<>
                                                    <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(index, true)}>
                                                        <span className={attempted[index]? ("text-green-300"):("text-white")}>
                                                            A: {prompt.answer}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(index, false)}>
                                                        <span>
                                                            A: {prompt.decoy}
                                                        </span>
                                                    </p>
                                                    <div className="text-center text-gray-400">{responseMessage[index]}</div>

                                                </>) : (<>
                                                    <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(index, false)}>
                                                    <span>
                                                        A: {prompt.decoy}
                                                    </span>
                                                    </p>
                                                    <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(index, true)}>
                                                        <span className={attempted[index]? ("text-green-300"):("text-white")}>
                                                            A: {prompt.answer}
                                                        </span>
                                                    </p>

                                                    <div className="text-center text-gray-400">{responseMessage[index]}</div>
                                                </>)
                                                    
                                                }
                                            </section>

                                        ))}
                                        <div>Your score: {scoreNumber}</div>
                                        <div>Your attempts: {attemptedNumber}</div>
                                    </>) : 
                                // INDIVIDUAL QUESTIONS ----------------------------------------------------------------------------
                                    (<>{ randomAnswerOrderArray[currentQuestionIndex] == 1 ? (<>
                                        <section className="bg-gray-800 p-10 rounded-lg">
                                            <p className="text-center text-gray-100 pb-5">Q{currentQuestionIndex + 1}: {quizInfo.questions[currentQuestionIndex].question}</p>

                                            <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(currentQuestionIndex, true)}>
                                                <span className={attempted[currentQuestionIndex]? ("text-green-300"):("text-white")}>
                                                    A: {quizInfo.questions[currentQuestionIndex].answer}
                                                </span>
                                            </p>
                                            <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(currentQuestionIndex, false)}>
                                                <span>
                                                    A: {quizInfo.questions[currentQuestionIndex].decoy}
                                                </span>
                                            </p>
                                            <div className="text-center text-gray-400">{responseMessage[currentQuestionIndex]}</div>
                                        </section>

                                    </>) : (<>
                                        <section className="bg-gray-800 p-10 rounded-lg mb-6">
                                            <p className="text-center text-gray-100 pb-5">Q{currentQuestionIndex + 1}: {quizInfo.questions[currentQuestionIndex].question}</p>
                                            <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(currentQuestionIndex, false)}>
                                                <span>
                                                    A: {quizInfo.questions[currentQuestionIndex].decoy}
                                                </span>
                                            </p>
                                            <p className="text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm" onClick={() => handleScore(currentQuestionIndex, true)}>
                                                <span className={attempted[currentQuestionIndex]? ("text-green-300"):("text-white")}>
                                                    A: {quizInfo.questions[currentQuestionIndex].answer}
                                                </span>
                                            </p>

                                            <div className="text-center text-gray-400">{responseMessage[currentQuestionIndex]}</div>
                                        </section>
                                    </>)
                                    }

                                    {/* PREVIOUS AND NEXT BUTTONS------------------------------------------------------------------------------------------------------------------------------------- */}
                                    <section className="flex justify-between">
                                        { currentQuestionIndex !== 0 ? (<button onClick={handlePreviousQuestion} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500">Previous question</button>)
                                        : (<div className="text-transparent">.</div>)
                                        }
                                        { currentQuestionIndex !== quizLength -1 ? (<button onClick={handleNextQuestion} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500">Next question</button>)
                                        : (<div className="transparent">.</div>)
                                        }
                                    </section>

                                </>)
                                }
                                </section>                    
                            </div>
                    </div>
                
                </>)
        }
        </>
    )
}