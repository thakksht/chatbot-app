import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import UserIcon from "./components/UserIcon";
import ToggleIcon from "./components/ToggleIcon"; // New import for toggle icon
import HeaderIcon from "./components/HeaderIcon"; // New import for header icon

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I help you today?" },
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const newMessage = messageInput.value.trim();
    if (newMessage) {
      setMessages([...messages, { type: "user", text: newMessage }]);
      messageInput.value = "";
    }
  };

  return (
    <div className="container">
      <div className={`chatbot-popup ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="header-info">
            <HeaderIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded" onClick={toggleChatbot}>
            {isOpen ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </button>
        </div>
        <div className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type}-message`}
            >
              {message.type === "bot" ? <ChatbotIcon /> : <UserIcon />}
              <p className="message-text">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Message..."
              className="message-input"
              required
            />
            <button className="material-symbols-rounded">arrow_upward</button>
          </form>
        </div>
      </div>
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <ToggleIcon />
      </div>
    </div>
  );
};

export default App;
