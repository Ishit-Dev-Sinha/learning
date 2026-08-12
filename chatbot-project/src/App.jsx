import { useState, useEffect, useRef } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import { ChatMessage } from './components/ChatMessage.jsx'
import './App.css'

function App() {
  const array = useState([]);

  const chatMessages = array[0];
  const setChatMessages = array[1];

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="app-container">
      <div className="messages-container" ref={chatMessagesRef}>
        {chatMessages.map((item) => {
          return (
            <ChatMessage
              message={item.message}
              sender={item.sender}
              key={item.id}
            />
          );
        })}
      </div>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
