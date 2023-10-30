
//import dotenv from 'dotenv';
//dotenv.config();
import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const MAX_WORDS_PER_STEP = 10;  // You can adjust this as needed

function removeDuplicateWords(str) {
    let words = str.split(" ");
    let uniqueWords = [...new Set(words)];
    return uniqueWords.join(" ");
}

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://learnscapebeta.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        console.log("Request body:", req.body);

        const query = typeof req.body === 'string' ? JSON.parse(req.body).query : req.body.query;
        
        const matches = query.instruction.match(/a beginner course in (.+?)\./);
        if (!matches) {
            console.error("Failed to extract topic from instruction:", query.instruction);
            res.status(400).json({ error: "Failed to extract topic from instruction" });
            return;
        }
        const topic = matches[1];
        
        const messages = [
            { role: "system", content: "You are a helpful assistant specialized in creating educational course outlines." },
            { role: "user", content: query.instruction }
        ];

        console.log("Sending request to OpenAI...");

        const chatGPTResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
            })
        });

        const chatGPTData = await chatGPTResponse.json();

        console.log("Received response from OpenAI:", chatGPTData);

        const courseOutline = chatGPTData.choices[0].message.content.trim().split('\n')
            .filter(step => step.split(' ').length <= MAX_WORDS_PER_STEP);

        console.log("Course outline created:", courseOutline);

        const videos = [];
    const errors = [];
    const selectedVideoIds = []; // New array to track already selected video IDs

    for (const step of courseOutline) {
        const searchQuery = `${step} ${topic}`;
        const cleanedSearchQuery = removeDuplicateWords(searchQuery);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${cleanedSearchQuery}&maxResults=5&type=video&key=${YOUTUBE_API_KEY}`; // Changed maxResults to 5 to have more choices for filtering

        console.log(`Fetching YouTube video for query: "${cleanedSearchQuery}"...`);

        try {
            const response = await fetch(url);
            const responseData = await response.json();

            console.log("Received YouTube response for query:", cleanedSearchQuery, responseData);

            if (responseData.items && responseData.items.length > 0) {
                // Filter out videos that have already been selected
                const uniqueVideos = responseData.items.filter(item => !selectedVideoIds.includes(item.id.videoId));

                if (uniqueVideos.length === 0) {
                    errors.push({ error: "No unique video found for " + cleanedSearchQuery });
                    continue;
                }

                const rankedVideos = uniqueVideos.sort((a, b) => {
                    const aCount = cleanedSearchQuery.split(" ").reduce((acc, word) => acc + (a.snippet.title.includes(word) ? 1 : 0), 0);
                    const bCount = cleanedSearchQuery.split(" ").reduce((acc, word) => acc + (b.snippet.title.includes(word) ? 1 : 0), 0);
                    return bCount - aCount;
                });
                videos.push({
                    title: step,
                    video: rankedVideos[0]
                });
                // Add the video ID to selectedVideoIds
                selectedVideoIds.push(rankedVideos[0].id.videoId);
            } else {
                errors.push({ error: "No video found for " + cleanedSearchQuery });
            }
        } catch (err) {
            console.error("Error fetching video for query:", cleanedSearchQuery, err.message);
            errors.push({ error: "Error fetching video for " + cleanedSearchQuery });
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
