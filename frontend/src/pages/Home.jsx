import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Cannot connect to ZOL AI Backend",
        },
      ]);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>ZOL AI</h1>
        <p>Intelligence Without Limits</p>
      </div>

      <div className="chat">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "message user"
                : "message ai"
            }
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="input-area">

        <input
          placeholder="Ask ZOL AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}