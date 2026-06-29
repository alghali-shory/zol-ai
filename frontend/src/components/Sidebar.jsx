import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">

        <img src="/logo.jpeg" alt="ZOL AI" />

        <h2>ZOL AI</h2>

      </div>

      <button className="new-chat">
        + New Chat
      </button>

      <div className="history">

        <div className="chat-item">
          Welcome
        </div>

      </div>

      <div className="footer">

        <p>ZOL AI v1.0</p>

      </div>

    </div>
  );
}