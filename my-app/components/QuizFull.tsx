"use client" 
import _, { isBoolean } from 'lodash'
import Link from "next/link";
import { useEffect, useState } from "react";
import ApiDeleteButton from "./ApiDeleteButton";
import QuizQuestion from "./QuizQuestion";
import Popup from "./Popup";
import ApiUpdateButton from "./ApiUpdateButton";
import quizApi from '@/apiHelper';


/* Define interface for fetched quiz data */
interface FetchedQuizData {
    id: number;
    public: boolean;
    created_at: string;
    questions: {
        decoy: string;
        answer: string;
        question: string;
    }[];
    user_id: string;
    name: string;
    globalPlays: string;
    description: string;
}


export default function QuizFull({ fetchedQuizData, userId }: { fetchedQuizData: FetchedQuizData, userId: string }) {
    let quizLength = fetchedQuizData.questions.length
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
    
    
    function handleAttempt (index: number) {
        if (attempted[index] == 0) {
            let temporary = attempted
            temporary[index] = 1
            setAttempted(temporary)
            setAttemptedNumber(temporary.reduce((total, currentValue) => total + currentValue, 0))
        }
    }
    async function handleScore (index: number, isCorrect: 'boolean') {
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
                handlePlaysCount()
            }, 3000); // 1000 milliseconds = 1 second
        }
    }
    function handleNextQ () {
        if (currentQIndex < updatedQuizData.questions.length -1) {
            setCurrentQIndex(prev => prev+1)
        }
    }
    function handlePreviousQ () {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev-1)
        }
    }
    function toggleDisplay () {
        setDisplayList(prev => !prev)
    }
    function adjustResponseMessage(isCorrect: 'boolean', respectiveIndex: number) {
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
    const isUserQuizOwner = (fetchedQuizData.user_id === userId)
    
    let progressBarWidth = `${100 / quizLength}%`
    
    
    
    function resetProgress () {
        setScore(Array(quizLength).fill(0))
        setScoreNumber(0)
        setAttempted(Array(quizLength).fill(false))
        setAttemptedNumber(0)
        setResponseMessage(Array(quizLength).fill(""))
    }
    
    
    const [updateMode, setUpdateMode] = useState(false)
    const [updatedQuizData, setUpdateInfo] = useState(fetchedQuizData)
    function handleUpdateToggle () {
        let temporary = !updateMode
        setUpdateMode(temporary)
        
        if (temporary === false) {
            setUpdateInfo(fetchedQuizData) // reset data back to original if updateMode cancelled
        }
    }
    console.log("Quiz : ", fetchedQuizData)
    console.log("Update  -----: ", updatedQuizData)


    function handleEditTyping(fieldType: string, newValue: any, questionIndex: number) {
        //One common reason for one field updates overriding another field updates when working with state is the order in which state updates are being processed. When updating state in React, changes are usually batched together. If you are updating state based on the previous state, it's important to make sure that you are working with the most up-to-date state.
        // To address this issue, you can modify the handleEditTyping function to use the functional form of setState, which allows you to update the state based on the previous state. This ensures that each update is independent and doesn't interfere with other field updates.
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);
            switch (fieldType) {
                case "public":
                    if (typeof newValue === 'boolean') {
                        updatedQuizInfo[fieldType] = newValue;
                    }
                    break;                    
                case "name":
                case "description":
                    if (typeof newValue === 'string') {
                    updatedQuizInfo[fieldType] = newValue;
                    }
                    break;                    
                case "question":
                case "answer":
                case "decoy":
                    if (typeof newValue === 'string') {
                        updatedQuizInfo.questions[questionIndex][fieldType] = newValue;
                    }
                    break;
                    default:
                break;
            }
            return updatedQuizInfo;
        });
    };

    if (currentQIndex >= updatedQuizData.questions.length) {
        // Adjust the current question index to a valid index
        setCurrentQIndex(updatedQuizData.questions.length - 1);
        return null; // Return null or handle the case where the question index is out of bounds
    }

    function handleDeleteQ (index: number) {
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);

            if (updatedQuizInfo.questions.length > 1) {
                updatedQuizInfo.questions.splice(index, 1)
            }
            return updatedQuizInfo;
        });
    }
    function handleAddQ(index: number, viewQuestionAfter: boolean) {
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);

            if (updatedQuizInfo.questions.length < 100) { //max questions = 100
                updatedQuizInfo.questions.splice(index, 0, {decoy: "Decoy", answer: "Answer", question: "Question"})
            }
            return updatedQuizInfo;
        });
        if (viewQuestionAfter) handleNextQ()
    }
    async function handlePlaysCount () {
        setUpdateInfo(prevUpdateInfo => {
            const updatedQuizInfo = _.cloneDeep(prevUpdateInfo);
            let newCount = Number(updatedQuizInfo.globalPlays) +1
            updatedQuizInfo.globalPlays = newCount.toString()
            quizApi("quizzes", "PATCH", updatedQuizData.id, updatedQuizInfo)
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
                            <div key={updatedQuizData.id} className="shadow-md rounded-lg p-4 m-2 border border-blue-300">
                                <section className="flex justify-between">
                                    <h2 className="text-xl font-bold mb-4">{updatedQuizData.name}
                                        <p className="text-sm font-normal">{updatedQuizData.description}</p>
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
                                            <div>Questions: {updatedQuizData.questions.length}</div>
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
                                        {updatedQuizData.questions.map((prompt, index) => (                    
                                            <section key={index}>
                                                <QuizQuestion handleDeleteQ={handleDeleteQ} handleAddQ={handleAddQ} updateMode={updateMode} randomArray={randomArray} attempted={attempted} currentQIndex={index} fetchedQuizData={fetchedQuizData} score={score} handleEditTyping={handleEditTyping} displayList={displayList} updatedQuizData={updatedQuizData}responseMessage={responseMessage} handleScore={handleScore}></QuizQuestion>
                                            </section>
                                        ))}
                                    </>) : 
                                // INDIVIDUAL QS ----------------------------------------------------------------------------
                                (<>
                                    <QuizQuestion handleDeleteQ={handleDeleteQ} handleAddQ={handleAddQ}updateMode={updateMode} randomArray={randomArray} attempted={attempted} currentQIndex={currentQIndex} fetchedQuizData={fetchedQuizData} score={score} handleEditTyping={handleEditTyping} displayList={displayList} updatedQuizData={updatedQuizData}responseMessage={responseMessage} handleScore={handleScore}></QuizQuestion>
                                    {/* PREVIOUS AND NEXT BUTTONS------------------------------------------------------------------------------------------------------------------------------------- */}
                                    <section className="flex justify-between w-full">
                                        { currentQIndex !== 0 ? 
                                            (<button onClick={handlePreviousQ} className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500">Previous Q</button>)
                                            : (<div className="text-transparent">.</div>)
                                        }
                                        { currentQIndex !== updatedQuizData.questions.length -1 ? 
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
                        <ApiUpdateButton quizId={fetchedQuizData.id} handleUpdateToggle={handleUpdateToggle} updatedQuizData = {updatedQuizData} resetProgress={resetProgress}></ApiUpdateButton>
                        <ApiDeleteButton quizId={fetchedQuizData.id}></ApiDeleteButton>
                    </div>
                    ):(<></>
                )
            } 
        </>
    )
}