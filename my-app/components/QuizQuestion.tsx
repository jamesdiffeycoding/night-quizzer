"use client"
export default function QuizQuestion ({randomArray, attempted, currentQIndex, quizInfo, responseMessage, handleScore, score}) {
    return (
        <> 
            <section className={`bg-gray-800 p-10 rounded-lg my-2 ${score[currentQIndex] === 1 ? 'border border-4 border-solid border-green-200' : attempted[currentQIndex] === 1 ? 'border border-4 border-red-300' : ''}`}>
                <h3 className="text-center text-gray-300 pb-5">Q{currentQIndex + 1}: {quizInfo.questions[currentQIndex].question}</h3>
            { randomArray[currentQIndex] == 1? 
            (<>
                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                    A: {quizInfo.questions[currentQIndex].answer}
                </p>
                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                    A: {quizInfo.questions[currentQIndex].decoy}
                </p>
            </>
            ) : (<>
                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? '' : attempted[currentQIndex] === 1 ? 'text-red-300' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                    A: {quizInfo.questions[currentQIndex].decoy}
                </p>
                <p className={`text-gray-100 hover:bg-gray-700 transition-colors duration-300 max-w-screen-sm ${score[currentQIndex] === 1 ? 'text-green-300' : attempted[currentQIndex] === 1 ? '' : ''}`} onClick={() => handleScore(currentQIndex, true)}>
                    A: {quizInfo.questions[currentQIndex].answer}
                </p>
            </>)
            
                
                
        }
        <div className="text-center text-gray-400">{responseMessage[currentQIndex]}</div>
        </section>
        </>
    )
}