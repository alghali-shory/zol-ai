import "./Sidebar.css";

export default function Sidebar({

    chats = [],

    currentChat = 0,

    onNewChat = () => {},

    onSelectChat = () => {}

}) {

    return (

        <div className="sidebar">

            <div className="logo">

                <img src="/logo.jpeg" alt="ZOL AI" />

                <h2>ZOL AI</h2>

            </div>

            <button

                className="new-chat"

                onClick={onNewChat}

            >

                + New Chat

            </button>

            <div className="history">

                {chats.map((chat,index)=>(

                    <div

                        key={index}

                        className="chat-item"

                        onClick={()=>onSelectChat(index)}

                        style={{

                            background:

                                index===currentChat

                                    ? "#334155"

                                    : ""

                        }}

                    >

                        {chat.title}

                    </div>

                ))}

            </div>

            <div className="footer">

                <p>ZOL AI v1.0</p>

            </div>

        </div>

    );

}