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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const newMessage = messageInput.value.trim();
    if (newMessage) {
      setMessages([...messages, { type: "user", text: newMessage }, { type: "bot", text: "Generating response..." }]);
      messageInput.value = "";

      try {
        // Call Gemini API
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta2/models/gemini-2.0-flash:generateText?key=AIzaSyA7AFkDl6Yifaj3I7WHgeFBxvbdQGGh_zU", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: newMessage,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.output || "Sorry, I couldn't generate a response.";

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { type: "bot", text: botResponse },
        ]);
      } catch (error) {
        console.error("Error generating response:", error);
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { type: "bot", text: "Sorry, there was an error generating a response." },
        ]);
      }
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
