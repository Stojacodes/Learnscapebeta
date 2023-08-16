

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

module.exports = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const query = typeof req.body === 'string' ? JSON.parse(req.body).query : req.body.query;
    const topic = query.instruction.match(/learning (.+)\./)[1];

    // Create a chat-based prompt
    const messages = [
      { role: "system", content: "You are a helpful assistant specialized in creating educational course outlines." },
      { role: "user", content: `Create a 6-step beginner course outline for learning ${topic}.` }
    ];

    // Request a chat completion from OpenAI
    const chatGPTResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const courseOutline = chatGPTResponse.data.choices[0].message.content.trim().split('\n');
    const videos = [];

    for (const step of courseOutline) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${step}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`;
      const response = await axios.get(url);
      videos.push(response.data.items[0]);
    }

    res.status(200).json({ courseOutline, videos });
  } catch (error) {
    console.error('Error generating course structure:', error);
    res.status(500).json({ error: 'An error occurred while generating the course structure' });
  }
};








