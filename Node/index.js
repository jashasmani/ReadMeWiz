const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // Added axios for HTTP requests
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const GEMINI_API_KEY = "your-gemini-api-key"; // Replace with your Gemini API key
const GEMINI_API_URL = "https://api.gemini.com/v1"; // Replace with the actual Gemini API URL

app.use(bodyParser.json());
app.use(cors());

app.post("/api", async (req, res) => {
  try {
    const { userMessage } = req.body;

    console.log(userMessage);

    const response = await axios.post(
      `${GEMINI_API_URL}/chat`, // Replace with the correct Gemini API endpoint
      {
        message: userMessage, // Adjust the payload according to the Gemini API documentation
      },
      {
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiResponse = response.data.response || "No response from AI"; // Adjust according to the actual response structure

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error generating chat completion:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
