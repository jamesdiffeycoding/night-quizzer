"use client" 

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteQuizByIDButton from "./DeleteQuizByIdButton";
import UpdateQuizByIdButton from "./UpdateQuizByIdButton";
import QuizQuestion from "./QuizQuestion";
import {getCreationDay} from "../helper.js"
import Popup from "./Popup";

export default function FetchComponent() {
    const [debug, setDebug] = useState("")
    async function api(table, method) {
        let url = `http://localhost:3001/api/quiz`;
        setDebug(`${method} called...`);
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ table: table, 
                    method: method, 
                    id: 4,
                    data: {title: "test3", 
                        description: "API"}
                    })
            });
    
            if (response.ok) {
                console.log(`${method} success`);
                setDebug(`Response: OK. ${method} successful.`);
                const data = await response.json();
                console.log("Fetch returned data below----------------------------");
                console.log(data);
            } else {
                console.error(`Failed to ${method} quiz`);
                console.log(error);
                setDebug(`Error: ${method} failed`);
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
            setDebug(`Error: ${error} ${method} failed`);
        }
    };
          
    return (
        <> 
            <h1>TEST FUNCTIONS - {debug}</h1>
                <div onClick={() => api("notes", "DELETE")}><span className="text-red-500">DELETE</span></div>
                <div onClick={() => api("notes", "POST")}><span className="text-green-500">POST</span></div>
                <div onClick={() => api("notes", "UPDATE")}><span className="text-red-500">UPDATE</span></div>


        </>
    )
}