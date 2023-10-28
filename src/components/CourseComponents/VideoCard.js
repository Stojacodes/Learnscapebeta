import React from 'react';
import styled from 'styled-components';

const VideoCard = ({ video }) => {
  console.log("VideoCard - Received video prop:", video);
  const videoId = video.id;
  console.log("VideoCard - Extracted video ID:", videoId);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  const handleMarkComplete = () => {
    // Add functionality to mark the video as complete
    console.log(`Video ${videoId} marked as complete.`);
  };

  return (
    <CardWrapper>
      <VideoTitle>{video.title}</VideoTitle> {/* Display the video title */}
      <iframe width="620" height="390" src={videoUrl} title={video.title} frameBorder="0" allowFullScreen></iframe>
      <VideoDetails>
        <SynopsisTitle>Synopsis:</SynopsisTitle>
        <VideoSynopsis>{video.synopsis}</VideoSynopsis>
        <MarkComplete onClick={handleMarkComplete}>Mark as Complete</MarkComplete>
      </VideoDetails>
    </CardWrapper>
  );
};


export default VideoCard;


const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;  // This is the change
  align-items: center;
  margin: 15px 0;
`;

const VideoTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px; // Or adjust as needed
  color: #FFFFFF; // Or adjust to your design preference
`;

const VideoDetails = styled.div`
  flex: 1;
`;


const SynopsisTitle = styled.h4`
  color: #1DE9B6;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 30px; // Add some space below the title
`;

const VideoSynopsis = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 20px; // Increase the space between the synopsis and button
`;

const MarkComplete = styled.button`
  background-color: #1DE9B6;
  color: black;
  font-family: Inter;
  font-size: 14px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
