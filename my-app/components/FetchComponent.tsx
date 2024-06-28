"use client" 
import { useEffect, useState } from "react";

export default function FetchComponent() {
    const [debug, setDebug] = useState("")
    async function api(table, method, id) {
        let url = `https://quizzer-backend-api.onrender.com/api/quiz/${id ? id : ""}`;
        // DEV VERSION
        // let url = `http://localhost:3001/api/quiz/${id ? id : ""}`;
    
        setDebug(`${method} called...`);
        let request = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Adjust the request body for specific methods if needed
        if (method === 'POST' || method === 'PATCH') {
            request.body = JSON.stringify({ table: table, id: id, data: { title: "updatecode", description: "API", testcol: "test"} });
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
            <div onClick={() => api("notes", "POST")}><span className="text-green-500">POST</span></div>
            <div onClick={() => api("notes", "PATCH", "3")}><span className="text-red-500">PUT</span></div>
        </>
    )
}