// src/Chat.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat Application</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    width: "400px",
    height: "300px",
    border: "1px solid #ccc",
    padding: "10px",
    overflowY: "scroll",
    marginBottom: "20px",
  },
  message: {
    padding: "5px 0",
  },
  inputContainer: {
    display: "flex",
  },
  input: {
    width: "300px",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Chat;
