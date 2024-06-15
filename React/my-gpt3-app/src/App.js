// src/App.js
import React, { useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi"; // Send icon from react-icons/fi
import "./App.css"; // Import your CSS for styling

const App = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // Prevent sending empty messages

    try {
      const response = await axios.post("http://localhost:5000/api", {
        userMessage: inputText,
      });

      // const botResponse = response.data.readme_content;
      const botResponse =
        "# README ## Description **AVL Trees vs Red-Black Trees** | **Characteristic** | **AVL Trees** | **Red-Black Trees** | |---|---|---| | **Invention** | Adelson-Velsky and Landis | Stanford C++ library | | **Type** | Self-balancing binary search tree | Self-balancing binary search tree | | **Balancing** | Ensures balance factor of -1, 0, or +1 for every node | Enforces properties related to node colors and tree structure | | **Rotations** | Single and double rotations (4 types) | Fewer rotations on average (3 types) | | **Efficiency** | Guaranteed (O(log n)) time complexity for search, but slower insertions and deletions | (O(log n)) time complexity for search, insertion, and deletion | | **Usage** | Preferred when search operations are more frequent | Preferred when insertions and deletions are more frequent |";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: "user" },
        { text: botResponse, sender: "bot" },
      ]);

      setInputText(""); // Clear input after sending
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {message.sender === "bot" ? (
              <pre>{message.text}</pre>
            ) : (
              message.text
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="input-text"
        />
        <button type="submit" className="send-button">
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default App;
