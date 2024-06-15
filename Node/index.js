const axios = require('axios');

// Set the API key directly
const GOOGLE_API_KEY = 'AIzaSyBlUQW7EALQTRKsZpFSoUIyjvOPUeqTAis';
const GENERATE_TEXT_URL = 'https://generativeai.googleapis.com/v1/models/gemini-pro:generateText';

async function generateText(prompt) {
  try {
    const response = await axios.post(
      GENERATE_TEXT_URL,
      {
        prompt: prompt,
        maxTokens: 100,  // adjust this according to your needs
        temperature: 0.7,  // adjust this according to your needs
        topP: 0.9  // adjust this according to your needs
      },
      {
        headers: {
          'Authorization': `Bearer ${GOOGLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedText = response.data.choices[0].text;
    console.log(generatedText);
  } catch (error) {
    console.error("Error generating text:", error.response ? error.response.data : error.message);
  }
}

const prompt = "Write a story about a magic backpack.";
generateText(prompt);
