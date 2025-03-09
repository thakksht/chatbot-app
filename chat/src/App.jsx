import React from 'react'
import ChatbotIcon from './components/ChatbotIcon'

const App = () => {
  return (
    <div className='container'>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">
              Chatbot
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App