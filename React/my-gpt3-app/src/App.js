import React, { useState, useEffect, useRef } from "react";
import { Alert } from "antd";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import "./App.css";
import { botResponse, inputText } from "./Component/data";

const App = () => {
  // const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const textareaRef = useRef(null);

  const [textareaHeight, setTextareaHeight] = useState("auto");

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [inputText]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      // const response = await axios.post("http://localhost:5000/api", {
      //   userMessage: inputText,
      // });

      // const botResponse = response.data.readme_content;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: "user" },
        { text: botResponse, sender: "bot" },
      ]);

      // setInputText("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="chat-container">
        {showAlert && (
          <div className="alert-container">
            <Alert message="Success Tips" type="success" showIcon />
          </div>
        )}
        <div className="chat-box">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.sender === "bot" ? (
                <div
                  style={{
                    display: "flex",
                    alignContent: "end",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(message.text)}
                  >
                    Copy
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className="message-text">
                {message.sender === "bot" ? (
                  <pre>{message.text}</pre>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            ref={textareaRef}
            type="text"
            style={{ height: textareaHeight }}
            value={inputText}
            // onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="input-text"
            id="multiline-input"
          />
          <div className="div-btn"  style={{ height: textareaHeight }}>
            <button type="submit" className="send-button">
              <FiSend />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
