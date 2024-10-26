import React, { useState, useEffect } from "react";
import "./Chat.css";

const Chat = ({ roomName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Open WebSocket connection
    const socketInstance = new WebSocket(
      `ws://localhost:8000/ws/chat/${roomName}/`
    );

    socketInstance.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    socketInstance.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (socket && messageInput.trim()) {
      socket.send(
        JSON.stringify({
          message: messageInput,
        })
      );
      setMessageInput(""); // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room: {roomName}</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
