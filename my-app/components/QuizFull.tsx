"use client" 
import _ from 'lodash'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import ApiDeleteButton from "./ApiDeleteButton";
import QuizQuestion from "./QuizQuestion";
import {getCreationDay} from "../helper.js"
import Popup from "./Popup";
import ApiUpdateButton from "./ApiUpdateButton";

export default function QuizFull({ quizInfo, userId }) {
    let quizLength = quizInfo.questions.length
    const [score, setScore] = useState(Array(quizLength).fill(0))
    const [scoreNumber, setScoreNumber] = useState(0)
    const [attempted, setAttempted] = useState(Array(quizLength).fill(false))
    const [attemptedNumber, setAttemptedNumber] = useState(0)
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [responseMessage, setResponseMessage] = useState(Array(quizLength).fill(""))
    const [displayList, setDisplayList] = useState(false)
    const [randomArray, setRandomArray] = useState(Array(quizLength).fill(0))
    
    useEffect(() => {
        let temporary = randomArray
        for (let i = 0; i <= quizLength; i++) {
            temporary[i] = (Math.floor(Math.random() * 2))
        }
        setRandomArray(temporary)
    }, []);
    
    
    function handleAttempt (index) {
        if (attempted[index] == 0) {
            let temporary = attempted
            temporary[index] = 1
            setAttempted(temporary)
            setAttemptedNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
    }
    async function handleScore (index, isCorrect) {
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
                setPopupDisplay(true);
            }, 3000); // 1000 milliseconds = 1 second
        }
    }
    function handleNextQ (index) {
        if (currentQIndex < quizLength -1) {
            setCurrentQIndex(prev => prev+1)
        }
    }
    function handlePreviousQ (index) {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev-1)
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
    const isUserQuizOwner = (quizInfo.user_id === userId)
    
    let progressBarWidth = `${100 / quizLength}%`
    
    
    
    
    
    const [updateMode, setUpdateMode] = useState(false)
    const [updateInfo, setUpdateInfo] = useState(quizInfo)
    function handleUpdateToggle () {
        let temporary = !updateMode
        setUpdateMode(temporary)
        
        if (temporary === false) {
            setUpdateInfo(quizInfo) // reset data back to original if updateMode cancelled
        }
    }
    console.log("Quiz question info /////: ", quizInfo.questions)
    console.log("Update questions info -----: ", updateInfo.questions)


    function handleEditTyping(fieldType, newValue, questionIndex) {
        //One common reason for one field updates overriding another field updates when working with state is the order in which state updates are being processed. When updating state in React, changes are usually batched together. If you are updating state based on the previous state, it's important to make sure that you are working with the most up-to-date state.
        // To address this issue, you can modify the handleEditTyping function to use the functional form of setState, which allows you to update the state based on the previous state. This ensures that each update is independent and doesn't interfere with other field updates.
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);
            switch (fieldType) {
                case "name":
                    updatedQuizInfo.name = newValue;
                    break;
                case "description":
                    updatedQuizInfo.description = newValue;
                    break;
                case "question":
                    updatedQuizInfo.questions[questionIndex].question = newValue;
                    break;
                case "correctAnswer":
                    updatedQuizInfo.questions[questionIndex].answer = newValue;
                    break;
                case "decoyAnswer":
                    updatedQuizInfo.questions[questionIndex].decoy = newValue;
                    break;
                default:
                    // Handle any other fieldType if needed
                    break;
            }
            return updatedQuizInfo;
        });
    };

    if (currentQIndex >= updateInfo.questions.length) {
        // Adjust the current question index to a valid index
        setCurrentQIndex(updateInfo.questions.length - 1);
        return null; // Return null or handle the case where the question index is out of bounds
    }

    function handleDeleteQ(index) {
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);

            if (updatedQuizInfo.questions.length > 1) {
                updatedQuizInfo.questions.splice(index, 1)
            }
            return updatedQuizInfo;
        });
    }
    function handleAddQ(index) {
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);

            if (updatedQuizInfo.questions.length < 100) { //max questions = 100
                updatedQuizInfo.questions.splice(index, 0, {decoy: "Decoy", answer: "Answer", question: "Question"})
            }
            return updatedQuizInfo;
        });
    }
    
    
    return (
        <> 
            {/* PROGRESS BAR */}
            <section className="animate-in min-w-full h-1 flex bg-gray-800 rounded-lg">
                {score.map((result, qIndex) => (
                    <div key={qIndex} className={score[qIndex] === 1 ? "bg-green-500" : (attempted[qIndex] === 1 ? "bg-orange-400" : "bg-white")} style={{ width: progressBarWidth }}>
                    </div>
                ))}
            </section>
            {/* MAIN BODY---------------------------------------------------------------------------- */}
            { popupDisplay? 
                (<div>
                    <Popup score={scoreNumber} quizLength={quizLength}></Popup>
                    <div className="flex justify-between">
                        <button onClick={hidePopup} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500 text-center m-2">Review answers</button>
                        <button onClick={() => window.location.reload()} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500 text-center m-2">Try again</button>
                        <Link href={`/yourspace`} className="m-2 whitespace-nowrap left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-blue-900 hover:bg-btn-background-hover flex items-center group text-sm">Your space</Link>

                    </div>
                </div>):
                (<>
                    <div className="animate-in flex-1 flex flex-col gap-5 opacity-0 px-3 mt-5 mb-5 max-w-screen-lg w-5/6 min-w-fit">
                            <div key={updateInfo.id} className="shadow-md rounded-lg p-4 m-2 border border-blue-300">
                                <section className="flex justify-between">
                                    <h2 className="text-xl font-bold mb-4">{updateInfo.name}
                                        <p className="text-sm font-normal">{updateInfo.description}</p>
                                    </h2>

                                    <div className="flex items-center justify-right bg-blue-900 rounded-lg cursor-pointer text-xs p-2" onClick={toggleDisplay}>
                                        <span className="pr-2">List view </span>
                                        <div className={`w-9 h-5 rounded-full p-1  ${displayList ? 'bg-green-500' : 'bg-blue-500'}`}  >
                                            <div className={`w-3 h-3 bg-white rounded-full shadow-md transform ${displayList ? 'translate-x-full' : ''}`}></div>
                                        </div>
                                    </div>    
                                    {/* SCORE TRACKERS ------------------------------------------------------------------------------------------------------------------------------------------------ */}
                                    {updateMode ? (
                                        <div>
                                            <div>Questions: {updateInfo.questions.length}</div>
                                        </div>     
                                    ): (
                                        <div>
                                            <div>Score: {scoreNumber} / {quizLength}</div>
                                            <div>Qs remaining: {quizLength - attemptedNumber}</div>
                                        </div>
                                    )}
                                </section>

                                {/* QS BLOCK------------------------------------------------------------------------------------------------------------------------------------- */}
                                <section className="mt-4">
                                    {displayList ? 
                                // LIST OF QS ----------------------------------------------------------------------------

                                        (<>
                                        {updateInfo.questions.map((prompt, index) => (                    
                                            <section key={index}>
                                                <QuizQuestion handleDeleteQ={handleDeleteQ} handleAddQ={handleAddQ}updateMode={updateMode} randomArray={randomArray} attempted={attempted} currentQIndex={index} quizInfo={quizInfo} score={score} handleEditTyping={handleEditTyping} displayList={displayList} updateInfo={updateInfo}responseMessage={responseMessage} handleScore={handleScore}></QuizQuestion>
                                            </section>
                                        ))}
                                    </>) : 
                                // INDIVIDUAL QS ----------------------------------------------------------------------------
                                (<>
                                    <QuizQuestion handleDeleteQ={handleDeleteQ} handleAddQ={handleAddQ}updateMode={updateMode} randomArray={randomArray} attempted={attempted} currentQIndex={currentQIndex} quizInfo={quizInfo} score={score} handleEditTyping={handleEditTyping} displayList={displayList} updateInfo={updateInfo}responseMessage={responseMessage} handleScore={handleScore}></QuizQuestion>
                                    {/* PREVIOUS AND NEXT BUTTONS------------------------------------------------------------------------------------------------------------------------------------- */}
                                    <section className="flex justify-between w-full">
                                        { currentQIndex !== 0 ? 
                                            (<button onClick={handlePreviousQ} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500">Previous Q</button>)
                                            : (<div className="text-transparent">.</div>)
                                        }
                                        { currentQIndex !== updateInfo.questions.length -1 ? 
                                            (<button onClick={handleNextQ} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500">Next Q</button>)
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

            {/* QUIZ MANAGEMENT */}
                {isUserQuizOwner ? (
                    <div className="flex justify-between">
                        <ApiUpdateButton quizId={quizInfo.id} handleUpdateToggle={handleUpdateToggle}></ApiUpdateButton>
                        <ApiDeleteButton quizId={quizInfo.id}></ApiDeleteButton>
                    </div>
                    ):(<></>
                )
            } 
        </>
    )
}