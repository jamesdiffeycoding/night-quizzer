"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import quizApi from "../apiHelper";

export default function ApiPostNewQuizButton({quizId, userId}) {
   const [confirmation, setConfirmation] = useState(false);
   const [delay, setDelay] = useState(false)

   function handleUpdateClick() {
      let temporary = !confirmation
      setConfirmation(temporary);
      setTimeout(() => {
        setDelay(true);
     }, 3000); // 3000 milliseconds = 3 seconds
     handleUpdateToggle()
   }

   const blankQuizWithId = {      
      public: false,
         questions: [
            {
               decoy: "Decoy",
               answer: "Answer",
               question: "Question"
            }
         ],
         user_id: userId,
         name: "Name",
         globalPlays: "0",
         description: "A quiz about ___"
   }
   


   return (
      <div className="text-center bg-gray-700 hover:bg-gray-500 p-1 m-1 text-sm rounded-lg">
         <button onClick={() => {quizApi("quizzes", "POST", "", blankQuizWithId); window.location.reload()}}  className="p-2 rounded-lg text-amber-500 ">Create new quiz</button>
      </div>
   );
}