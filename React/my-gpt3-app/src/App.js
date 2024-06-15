import React, { useState } from "react";
import axios from "axios";

const InputForm = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(132);
      const response = await axios.post("http://localhost:5000/api", {
        userMessage: inputText,
      });
      console.log(response);
      setOutputText(response.data.generated_text);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          rows={4}
          cols={50}
        />
        <button type="submit">Generate Text</button>
      </form>
      {outputText && (
        <div>
          <h3>Generated Output:</h3>
          <p>{outputText}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
