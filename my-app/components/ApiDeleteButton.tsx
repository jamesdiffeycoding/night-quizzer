"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import quizApi from "../apiHelper";

export default function ApiDeleteButton({quizId}: {quizId: number}) {
   const [confirmation, setConfirmation] = useState(false);
   const [delay, setDelay] = useState(false)

   function handleDeleteClick() {
      setConfirmation(true);
      setTimeout(() => {
        setDelay(true);
     }, 3000); // 3000 milliseconds = 3 seconds
   }

   return (
      <div className="text-center bg-gray-700 hover:bg-gray-500 p-1 m-1 text-sm rounded-lg">
         { confirmation ? (
            <div>
               <p>Once this quiz has been deleted, it cannot be recovered. Are you sure you want to delete it?</p>
               {delay ? (
                 <button onClick={() => quizApi("notes", "DELETE", quizId)} className="p-2 rounded-lg text-red-500 bg-gray-900">Confirm delete</button>
               ):(<></>)}
            </div>
         ) : (
            <button onClick={handleDeleteClick} className="text-red-500 rounded-lg">Delete quiz</button>
         )}
      </div>
   );
}