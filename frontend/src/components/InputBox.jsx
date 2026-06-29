import { useState } from "react";
import api from "../services/api";

export default function InputBox({ messages, setMessages }) {

    const [message, setMessage] = useState("");

    async function sendMessage() {

        if (!message.trim()) return;

        const currentMessage = message;

        const newMessages = [
            ...messages,
            {
                role: "user",
                text: currentMessage
            }
        ];

        setMessages(newMessages);

        setMessage("");

        setMessages([
            ...newMessages,
            {
                role: "assistant",
                text: "⏳ ZOL AI is typing...",
                loading: true
            }
        ]);

        try {

            const res = await api.post("/chat", {
                message: currentMessage
            });

            setMessages([
                ...newMessages,
                {
                    role: "assistant",
                    text: res.data.response
                }
            ]);

        } catch {

            setMessages([
                ...newMessages,
                {
                    role: "assistant",
                    text: "❌ Backend Error"
                }
            ]);

        }

    }

    return (

        <div
            style={{
                padding:20,
                borderTop:"1px solid #1f2937",
                display:"flex",
                gap:15
            }}
        >

            <input

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

                onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                        sendMessage();
                    }
                }}

                placeholder="Message ZOL AI..."

                style={{
                    flex:1,
                    padding:15,
                    borderRadius:12,
                    border:"none",
                    background:"#1e293b",
                    color:"white",
                    fontSize:16,
                    outline:"none"
                }}
            />

            <button

                onClick={sendMessage}

                style={{
                    width:120,
                    border:"none",
                    borderRadius:12,
                    background:"#2563eb",
                    color:"white",
                    fontWeight:"bold",
                    cursor:"pointer"
                }}

            >
                Send

            </button>

        </div>

    );

}