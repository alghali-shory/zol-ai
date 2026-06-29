import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import InputBox from "../components/InputBox";

import "./Home.css";

export default function Home() {

    const [chats, setChats] = useState(() => {

        const saved = localStorage.getItem("zol_chats");

        return saved
            ? JSON.parse(saved)
            : [
                {
                    title: "Welcome",
                    messages: []
                }
            ];

    });

    const [currentChat, setCurrentChat] = useState(0);

    useEffect(() => {

        localStorage.setItem(
            "zol_chats",
            JSON.stringify(chats)
        );

    }, [chats]);

    function newChat() {

        setChats(prev => [
            ...prev,
            {
                title: `New Chat ${prev.length}`,
                messages: []
            }
        ]);

        setCurrentChat(chats.length);

    }

    function updateMessages(messages) {

        setChats(prev => {

            const copy = [...prev];

            copy[currentChat].messages = messages;

            if (
                copy[currentChat].title.startsWith("New Chat") &&
                messages.length > 0
            ) {
                copy[currentChat].title =
                    messages[0].text.substring(0, 25);
            }

            return copy;

        });

    }

    return (

        <div className="app">

            <Sidebar

                chats={chats}

                currentChat={currentChat}

                onNewChat={newChat}

                onSelectChat={setCurrentChat}

            />

            <div className="main">

                <Header />

                <ChatBox

                    messages={chats[currentChat]?.messages || []}

                />

                <InputBox

                    messages={chats[currentChat]?.messages || []}

                    setMessages={updateMessages}

                />

            </div>

        </div>

    );

}