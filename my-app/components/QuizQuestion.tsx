
"use client"
import { useEffect, useState } from "react"
//@ts-ignore
export default function QuizQuestion ({handleDeleteQ, handleAddQ, updateMode, displayList, randomArray, attempted, currentQIndex, responseMessage, handleScore, score, handleEditTyping, updatedQuizData}) {
    const [quizPublicity, setQuizPublicity] = useState(updatedQuizData.public)
    function changeQuizPublicity () {
        let temporary = !quizPublicity
        setQuizPublicity((prev: boolean) => temporary);
    }
    return (
        <>
            <section className={`bg-gray-800 p-10 rounded-lg my-2 w-full min-w-fit ${score[currentQIndex] === 1 ? 'border-4 border-solid border-green-200' : ''}`}>
            {updateMode ?
                (<>
                    {displayList && currentQIndex !== 0 ? (<></>):(
                        <section className="bg-black m-2 rounded-lg p-2">
                            <div className="flex justify-between m-2">
                                <p>Name of quiz: </p>
                                {/* @ts-ignore */}                                    
                                <input type="text" value={updatedQuizData.name} onChange={(e) => handleEditTyping("name", e.target.value, currentQIndex)} className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`} />
                            </div>

                            <div className="flex justify-between m-2 max-w-full">
                                <p>Description: </p>
                                {/* @ts-ignore */}                                    
                                <input type="text" value={updatedQuizData.description} onChange={(e) => handleEditTyping("description", e.target.value, currentQIndex)} className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`} />
                            </div>
                            <div className="flex items-center justify-between bg-blue-900 rounded-lg cursor-pointer text-xs p-2" onClick={() => {changeQuizPublicity(); handleEditTyping("public", !quizPublicity); }}>
                                <span className="pr-2">Make public? Others will get to enjoy your quiz too.</span>
                                <div className={`w-9 h-5 rounded-full p-1  ${quizPublicity ? 'bg-green-500' : 'bg-blue-500'}`}  >
                                    <div className={`w-3 h-3 bg-white rounded-full shadow-md transform ${quizPublicity ? 'translate-x-full' : ''}`}></div>
                                </div>
                            </div>    
                        </section>
                    )}
                    <section className="m-2 rounded-lg p-2">

                        <div className="flex justify-between m-2">
                            <p>Question {currentQIndex + 1}:</p>
                            {/* @ts-ignore */}
                            <input type="text" value={updatedQuizData.questions[currentQIndex].question} onChange={(e) => handleEditTyping("question", e.target.value, currentQIndex)} className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`} />
                        </div>
                        <div className="flex justify-between m-2">
                            <p>Correct answer: </p>
                            {/* @ts-ignore */}
                            <input type="text" value={updatedQuizData.questions[currentQIndex].answer} onChange={(e) => handleEditTyping("answer", e.target.value, currentQIndex)} className={`text-green-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`} />
                        </div>

                        <div className="flex justify-between m-2">
                            <p>Decoy answer: </p>
                            {/* @ts-ignore */}
                            <input type="text" value={updatedQuizData.questions[currentQIndex].decoy} onChange={(e) => handleEditTyping("decoy", e.target.value, currentQIndex)} className={`text-red-300 bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} />
                        </div>
                        <div className="text-center text-gray-400">{responseMessage[currentQIndex]}</div>
                        </section>
                        <section className="flex justify-between w-full">
                            {/* @ts-ignore */}
                            <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-red-500 mr-2" onClick={()=> handleDeleteQ(currentQIndex)}>Delete this question</button>
                            <div className="flex">
                                <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500 mr-2" onClick={()=> handleAddQ(currentQIndex, false)}>Add question BEFORE</button>
                                <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500" onClick={()=> handleAddQ(currentQIndex+1, true)}>Add question AFTER</button>
                            </div>

                        </section>

                </>) :
                (<>
                        <h3 className="text-center text-gray-300 pb-5">Q{currentQIndex + 1}: {updatedQuizData.questions[currentQIndex].question}</h3>
                        {randomArray[currentQIndex] === 1 ?
                            (<>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                                    A: {updatedQuizData.questions[currentQIndex].answer}
                                </p>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, false)}>
                                    A: {updatedQuizData.questions[currentQIndex].decoy}
                                </p>
                            </>) : (<>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, false)}>
                                    A: {updatedQuizData.questions[currentQIndex].decoy}
                                </p>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                                    A: {updatedQuizData.questions[currentQIndex].answer}
                                </p>
                            </>)
                        }
                        <div className="text-center text-gray-400">{responseMessage[currentQIndex]}</div>
                </>)
            }
            </section>
        </>
    );
}