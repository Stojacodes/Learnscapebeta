
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
    
    // Begin added code
    const matches = query.instruction.match(/a beginner course in (.+?)\./);
    if (!matches) {
        console.error("Failed to extract topic from instruction:", query.instruction);
        // Handle the error, for example, by sending a response
        res.status(400).json({ error: "Failed to extract topic from instruction" });
        return;
    }
    const topic = matches[1];
    // End added code
    
    const messages = [
        { role: "system", content: "You are a helpful assistant specialized in creating educational course outlines." },
        { role: "user", content: query.instruction }
    ];

    console.log("Sending request to OpenAI...");

    const chatGPTResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Received response from OpenAI:", chatGPTResponse.data);

    const courseOutline = chatGPTResponse.data.choices[0].message.content.trim().split('\n')
                          .filter(step => step.split(' ').length <= MAX_WORDS_PER_STEP);

    console.log("Course outline created:", courseOutline);

    const videos = [];
    const errors = [];

    for (const step of courseOutline) {
      const searchQuery = `${step} ${topic}`;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`;

      console.log(`Fetching YouTube video for query: "${searchQuery}"...`);

      try {
        const response = await axios.get(url);
        
        console.log("Received YouTube response for query:", searchQuery, response.data);

        if (response.data.items && response.data.items.length > 0) {
          const rankedVideos = response.data.items.sort((a, b) => {
            const aCount = searchQuery.split(" ").reduce((acc, word) => acc + (a.snippet.title.includes(word) ? 1 : 0), 0);
            const bCount = searchQuery.split(" ").reduce((acc, word) => acc + (b.snippet.title.includes(word) ? 1 : 0), 0);
            return bCount - aCount;
          });
          videos.push({
            title: step,  // This is the course outline step from ChatGPT
            video: rankedVideos[0]
          });
        } else {
          errors.push({ error: "No video found for " + searchQuery });
        }
      } catch (err) {
          console.error("Error fetching video for query:", searchQuery, err.message);
          errors.push({ error: "Error fetching video for " + searchQuery });
      }
    }

    console.log("Sending response with videos:", videos, "and errors:", errors);
    res.status(200).json({ videos: videos, errors: errors });

  } catch (error) {
    console.error("General error:", error);
    if (error.response) {
      res.status(500).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: 'An error occurred while making the request' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred while generating the course structure' });
    }
  }
};
