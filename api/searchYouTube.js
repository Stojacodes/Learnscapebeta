const fetch = require('node-fetch');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

module.exports = async (req, res) => {
  try {
    const query = req.query.q; // Retrieve the query parameter from the request
    const excludeVideoIds = req.query.excludeVideoIds || []; // Retrieve an array of video IDs to exclude

    const url = new URL(YOUTUBE_API_URL);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('maxResults', '6'); // You can change the number of results
    url.searchParams.append('q', query);
    url.searchParams.append('key', YOUTUBE_API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`);
  }

    console.log('URL:', url.toString()); // Log the URL
    console.log('Raw response:', response); // Log the raw response
    const data = await response.json();
    console.log('Received YouTube data:', data); // Log the actual data received from YouTube
    
    res.status(200).json(data); // Return the results as JSON
  } catch (error) {
    console.error('Error in serverless function:', error);
    res.status(500).json({ error: 'An error occurred while fetching videos.' });
  }
};
