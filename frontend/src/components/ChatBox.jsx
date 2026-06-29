import { useEffect, useRef } from "react";

export default function ChatBox({ messages }) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    return (

        <div
            style={{
                flex:1,
                padding:30,
                overflowY:"auto",
                display:"flex",
                flexDirection:"column",
                gap:15,
                color:"white"
            }}
        >

            {messages.length === 0 && (

                <div
                    style={{
                        textAlign:"center",
                        marginTop:80
                    }}
                >

                    <h2>👋 Welcome to ZOL AI</h2>

                    <p>Intelligence Without Limits</p>

                </div>

            )}

            {messages.map((msg,index)=>(

                <div

                    key={index}

                    style={{

                        alignSelf:
                            msg.role==="user"
                                ?"flex-end"
                                :"flex-start",

                        background:
                            msg.role==="user"
                                ?"#2563eb"
                                :"#1e293b",

                        padding:"14px 18px",

                        borderRadius:"16px",

                        maxWidth:"75%",

                        whiteSpace:"pre-wrap",

                        lineHeight:"1.6"

                    }}

                >

                    {msg.text}

                </div>

            ))}

            <div ref={bottomRef}></div>

        </div>

    );

}