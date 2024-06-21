"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";


export default function UpdateQuizByIdButton({quizId, name, description, questions}) {
  const [debug, setDebug] = useState("")
  let updateInformation = `${quizId}___${name}___${description}___${questions}`
  const handleUpdate = () => {
    setDebug("Updating...")
    fetch(`/api/update/${updateInformation}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        console.log('Quiz updated successfully');
        // You can add further UI updates or actions here
        setDebug(`Response: OK. The quiz has been updated.`)
      } else {
        console.error('Failed to update quiz');
        setDebug(`Error: "Failed to update"`)
      }
    })
    .catch(error => {
      console.error('Error updating quiz:', error);
      setDebug(`Error: ${error}`)

      // Handle any errors that occur during the fetch
    });
  };
  


    return (
      <>
        <button style={{color:"green"}} onClick={() => {handleUpdate()}}>UPDATE THIS QUIZ</button>
        <div>{debug}</div>
      </>

    );
  }
  