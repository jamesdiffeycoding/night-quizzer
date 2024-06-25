"use client"

import { useState } from "react";
export default function Popup ({score, quizLength}) {

    return (
        <div className='animate-in popup-overlay bg-blue-500 rounded-lg p-5 w-full my-10'>
            <div className="popup dark-theme">
                <div className="popup-content">
                    <h2 className="text-blue-900 text-xl font-bold text-center">Nice work!</h2>
                    <p>You scored {score} / {quizLength}</p>
                    <p>Reflect on what you learned.</p>
                </div>
            </div>
        </div>
    );
}
