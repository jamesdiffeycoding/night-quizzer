"use client" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import DeleteQuizByIDButton from "./DeleteQuizByIdButton";
import UpdateQuizByIdButton from "./UpdateQuizByIdButton";

export default function QuizCard({ quizInfo }) {
    const [play, setPlay] = useState(false);
    console.log(quizInfo);

    return (
        <>
            {quizInfo.map((quiz) => (
                <div key={quiz.id} className="shadow-md rounded-lg p-4 m-2 border border-blue-300">
                    <h2 className="text-xl font-bold">Quiz: {quiz.name}</h2>
                    <p className="text-gray-600">{quiz.description}</p>
                    <p className="text-gray-400">Created at: {quiz.created_at}</p>
                    <p className="text-gray-400">Plays Count: {quiz.playsCount}</p>
                    <Link href={`/yourspace/${quiz.id}`}>Play or manage this quiz</Link>
                </div>
            ))}
        </>
    )
}