"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import quizApi from "../apiHelper";

export default function ApiUpdateButton({quizId, handleUpdateToggle, updatedQuizData, resetProgress}) {
   const [confirmation, setConfirmation] = useState(false);
   const [delay, setDelay] = useState(false)

   function handleUpdateClick() {
      let temporary = !confirmation
      setConfirmation(temporary);
      setTimeout(() => {
        setDelay(true);
     }, 3000); // 3000 milliseconds = 3 seconds
     handleUpdateToggle()
     resetProgress()
   }

   return (
      <div className="text-center bg-gray-700 hover:bg-gray-500 p-1 m-1 text-sm rounded-lg">
         { confirmation ? (
            <div>
               <p>Edit the questions and press Update when you're ready.</p>
               {delay ? (
                  <>
                     <button onClick={() => {quizApi("quizzes", "PATCH", quizId, updatedQuizData); window.location.reload()}} className="p-2 rounded-lg text-amber-500 bg-gray-900 mr-1">Confirm update.</button>
                     <button onClick={handleUpdateClick} className="p-2 rounded-lg text-amber-500 bg-gray-900 ml-1">X</button>
                  </>
               ):(<></>)}
            </div>
         ) : (
            <button onClick={handleUpdateClick} className="text-amber-500 rounded-lg">Edit quiz</button>
         )}
      </div>
   );
}