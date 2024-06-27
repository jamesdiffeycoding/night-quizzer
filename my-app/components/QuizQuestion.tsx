
"use client"
import { useEffect, useState } from "react"
export default function QuizQuestion ({handleDeleteQ, handleAddQ, updateMode, displayList, randomArray, attempted, currentQIndex, responseMessage, handleScore, score, handleEditTyping, updateInfo}) {
    
    return (
        <>
            <section className={`bg-gray-800 p-10 rounded-lg my-2 w-full min-w-fit ${score[currentQIndex] === 1 ? 'border border-4 border-solid border-green-200' : ''}`}>
            {updateMode ?
                (<>
                    {displayList && currentQIndex !== 0 ? (<></>):(
                        <section className="bg-black m-2 rounded-lg p-2">
                            <div className="flex justify-between m-2">
                                <p>Name of quiz: </p>
                                <input
                                    type="text"
                                    value={updateInfo.name}
                                    onChange={(e) => handleEditTyping("name", e.target.value, currentQIndex)}
                                    className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`}
                                    />
                            </div>
                            <div className="flex justify-between m-2 max-w-full">
                                <p>Description: </p>
                                
                                <input
                                    type="text"
                                    value={updateInfo.description}
                                    onChange={(e) => handleEditTyping("description", e.target.value, currentQIndex)}
                                    className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`}
                                    />
                            </div>
                        </section>
                    )}
                    <section className="m-2 rounded-lg p-2">

                        <div className="flex justify-between m-2">
                            <p>Question {currentQIndex + 1}:</p>
                            <input
                                type="text"
                                value={updateInfo.questions[currentQIndex].question}
                                onChange={(e) => handleEditTyping("question", e.target.value, currentQIndex)}
                                className={`text-gray-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`}
                            />
                        </div>
                        <div className="flex justify-between m-2">
                            <p>Correct answer: </p>
                            <input
                                type="text"
                                value={updateInfo.questions[currentQIndex].answer}
                                onChange={(e) => handleEditTyping("correctAnswer", e.target.value, currentQIndex)}
                                className={`text-green-300 width-full bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 ${score[currentQIndex] === 1 ? 'text-green-300' : ''}`}
                            />
                        </div>

                        <div className="flex justify-between m-2">
                            <p>Decoy answer: </p>

                            <input
                                type="text"
                                value={updateInfo.questions[currentQIndex].decoy}
                                onChange={(e) => handleEditTyping("decoyAnswer", e.target.value, currentQIndex)}
                                className={`text-red-300 bg-gray-700 hover:bg-gray-500 p-2 rounded-lg transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`}
                            />
                        </div>
                        <div className="text-center text-gray-400">{responseMessage[currentQIndex]}</div>
                        </section>
                        <section className="flex justify-between w-full">
                            <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-red-500" onClick={()=> handleDeleteQ(currentQIndex)}>Delete this question</button>
                            <div className="flex">
                                <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500 mr-2" onClick={()=> handleAddQ(currentQIndex)}>Add question BEFORE</button>
                                <button className="bg-blue-900 rounded-md p-2 text-sm hover:bg-green-500" onClick={()=> handleAddQ(currentQIndex+1)}>Add question AFTER</button>
                            </div>

                        </section>

                </>) :
                (<>
                        <h3 className="text-center text-gray-300 pb-5">Q{currentQIndex + 1}: {updateInfo.questions[currentQIndex].question}</h3>
                        {randomArray[currentQIndex] === 1 ?
                            (<>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                                    A: {updateInfo.questions[currentQIndex].answer}
                                </p>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, false)}>
                                    A: {updateInfo.questions[currentQIndex].decoy}
                                </p>
                            </>) : (<>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, false)}>
                                    A: {updateInfo.questions[currentQIndex].decoy}
                                </p>
                                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                                    A: {updateInfo.questions[currentQIndex].answer}
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