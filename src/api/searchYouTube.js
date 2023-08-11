const fetch = require('node-fetch');

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

exports.handler = async function (event, context) {
  // Retrieve the query parameter from the request
  const query = event.queryStringParameters.q;

  // Build the URL for the YouTube API request
  const url = new URL(YOUTUBE_API_URL);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('maxResults', '5'); // You can change the number of results
  url.searchParams.append('q', query);
  url.searchParams.append('key', YOUTUBE_API_KEY);

  // Make the API request to YouTube
  const response = await fetch(url.toString());
  const data = await response.json();

  // Return the results as JSON
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
