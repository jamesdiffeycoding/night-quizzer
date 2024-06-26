"use client"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";


export default async function UpdateQuizByIdButton2({quizId, name, description, questions}) {
  const [debug, setDebug] = useState("")
  let updateInformation = `${quizId}___${name}___${description}___${questions}`
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

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
  

    /* UPDATE QUIZ FUNCTION */
    async function updateQuiz(updateData) // updateData = { example: "value", description: "value"}
    { 
      if (updateData.length === 0) { console.log("No fields provided for update."); return;
      }
      const { data, error } = await supabase.from('quizzes') .update(updateData) .eq('id', quizId);
      if (error) { console.error("Error updating quiz:", error); // Handle the error, such as showing a message to the user
      } else { console.log("Quiz updated successfully:", data); // Handle the successful update, such as showing a success message
      }
    }
    updateQuiz({globalPlays: 3})
    return (
      <>
        <button style={{color:"green"}} onClick={() => {updateQuiz()}}>UPDATE THIS QUIZ</button>
        <div>{debug}</div>
      </>

    );
  }
  