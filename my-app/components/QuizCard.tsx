"use client" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {getCreationDay} from "../helper.js"
import { Quiz } from "@/app/interfaces.js";


export default function QuizCard({ fetchedQuizData = [], userId }: { fetchedQuizData: Quiz[], userId: string }) {
    const [play, setPlay] = useState(false);

    return (
        <>
            <div className="animate-in flex-1 flex flex-col gap-5 opacity-0 px-3 mt-5 mb-5 min-w-fit w-3/4 max-w-screen-sm">
                {fetchedQuizData.map((quiz) => (
                    <div key={quiz.id} className={userId == quiz.user_id ?("shadow-md rounded-lg p-4 m-2 border border-purple-300"):("shadow-md rounded-lg p-4 m-2 border border-blue-300")} >
                        <h2 className="text-xl">
                            <span className="bg-gray-800 rounded-md p-2 text-sm">
                                {userId == quiz.user_id ?("your quiz"):("public quiz")}  
                            </span>
                                {" " + quiz.name}
                        </h2>
                        <p className="text-gray-300">{quiz.description}</p>
                        <div className="grid grid-cols-3 mt-2 mb-2">
                            <span className="text-gray-400"><strong>Questions:</strong> {quiz.questions.length}</span>
                            <span className="text-gray-400 text-center"><strong>Made:</strong> {getCreationDay(quiz.created_at)}</span>
                            <span className="text-gray-400 mb-2 text-right"><strong>Plays:</strong> {quiz.globalPlays}</span>
                        </div>
                        <Link className="bg-blue-900 rounded-md p-2 text-sm" href={`/yourspace/${quiz.id}`}>{userId == quiz.user_id ?("Play or manage this quiz"):("Play this quiz")}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}