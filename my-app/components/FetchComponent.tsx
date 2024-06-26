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
    async function api(table, method, id) {
        let url = `http://localhost:3001/api/quiz/${id ? id : ""}`;
        setDebug(`${method} called...`);
        let request = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Adjust the request body for specific methods if needed
        if (method === 'POST' || method === 'PATCH') {
            request.body = JSON.stringify({ table: table, id: id, data: { title: "updatecode", description: "API", testcol: "test" } });
        }
    
        try {
            const response = await fetch(url, request);
    
            if (response.ok) {
                console.log(`${method} success`);
                setDebug(`Response: OK. ${method} successful.`);
                const data = await response.json();
                console.log("Fetch returned data below----------------------------");
                console.log(data);
            } else {
                console.error(`Failed to ${method} quiz`);
                setDebug(`Error: Failed to ${method} quiz`);
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
            setDebug(`Error: ${error.message}`);
        }
    }     
    return (
        <> 
            <h1>TEST FUNCTIONS - {debug}</h1>
                <div onClick={() => api("notes", "POST")}><span className="text-green-500">POST</span></div>
                <div onClick={() => api("notes", "DELETE", "7")}><span className="text-red-500">DELETE</span></div>
                <div onClick={() => api("notes", "PATCH", "8")}><span className="text-red-500">PUT</span></div>
        </>
    )
}