# server.py
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration for generative AI API
GOOGLE_API_KEY = 'AIzaSyBlUQW7EALQTRKsZpFSoUIyjvOPUeqTAis'
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the generative model
model = genai.GenerativeModel('gemini-pro')

@app.route('/api', methods=['POST'])
def generate_readme():
    data = request.json
    user_message = data['userMessage']

    # Generate content using the model based on user input
    response = model.generate_content(user_message)

    # Extract the generated text
    generated_text = response.text

    # Prepare the README content structure
    readme_content = f"# README\n\n## Description\n\n{generated_text}\n"

    return jsonify({'readme_content': readme_content})

if __name__ == '__main__':
    app.run(debug=True)
