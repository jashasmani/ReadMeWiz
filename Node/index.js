// app.js
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: "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",
});

app.use(bodyParser.json());
app.use(cors());


app.post("/api", async (req, res) => {
  try {
    const { userMessage } = req.body; 

    console.log(userMessage);
    
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const response =
      chatCompletion.choices[0]?.message?.content || "No response from AI";

    res.status(200).json({ response });
  } catch (error) {
    console.error("Error generating chat completion:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
