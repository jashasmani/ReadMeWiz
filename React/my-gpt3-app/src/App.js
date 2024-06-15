import React, { useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi"; // Assuming you have React Icons installed for copy icon

const InputForm = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api", {
        userMessage: inputText,
      });
      setOutputText(response.data.readme_content);
      setCopied(false); // Reset copied state on new submit
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-message user-message">{inputText}</div>
        {outputText && (
          <div className="chat-message bot-message">
            <pre>{outputText}</pre>
            <button className="copy-button" onClick={handleCopy}>
              <FiCopy />
            </button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          className="input-textarea"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          rows={6}
        />
        <button type="submit" className="submit-button">
          Generate README.md
        </button>
      </form>
      {copied && <div className="copy-message">Copied to clipboard!</div>}
    </div>
  );
};

export default InputForm;
