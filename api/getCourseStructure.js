
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_WORDS_PER_STEP = 10;  // You can adjust this as needed

module.exports = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const query = typeof req.body === 'string' ? JSON.parse(req.body).query : req.body.query;
    const topic = query.instruction.match(/learning (.+)\./)[1];

    const messages = [
      { role: "system", content: "You are a helpful assistant specialized in creating educational course outlines." },
      { role: "user", content: `Create a 6-step beginner course outline for learning ${topic}.` }
    ];

    const chatGPTResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const courseOutline = chatGPTResponse.data.choices[0].message.content.trim().split('\n')
                          .filter(step => step.split(' ').length <= MAX_WORDS_PER_STEP);

    const videos = [];
   
    for (const step of courseOutline) {
      const searchQuery = `${step} ${topic}`;

      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`;
      
      try {
        const response = await axios.get(url);
        
        if (response.data.items && response.data.items.length > 0) {
          const rankedVideos = response.data.items.sort((a, b) => {
            const aCount = searchQuery.split(" ").reduce((acc, word) => acc + (a.snippet.title.includes(word) ? 1 : 0), 0);
            const bCount = searchQuery.split(" ").reduce((acc, word) => acc + (b.snippet.title.includes(word) ? 1 : 0), 0);
            return bCount - aCount;
          });
          videos.push(rankedVideos[0]);
        } else {
          videos.push({ error: "No video found for " + searchQuery });
        }
      } catch (err) {
          videos.push({ error: "Error fetching video for " + searchQuery });
      }
    }

    res.status(200).json(videos);

  } catch (error) {
    if (error.response) {
      res.status(500).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: 'An error occurred while making the request' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred while generating the course structure' });
    }
  }
};

