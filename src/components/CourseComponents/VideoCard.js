import React, { useState } from 'react';
import styled from 'styled-components';

const VideoCard = ({ video }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index to manage which video to show
  
  // Check if there are alternative videos
  const hasAlternatives = Array.isArray(video.videos) && video.videos.length > 1;

  const currentVideo = video.videos[currentIndex];
  const videoId = currentVideo.id;
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;

  const handleMarkComplete = () => {
    console.log(`Video ${videoId} marked as complete.`);
  };

  const handleSwitchVideo = () => {
    // Switch to the next video in the list, and loop back to the first video if at the end
    const nextIndex = (currentIndex + 1) % video.videos.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <CardWrapper>
      <VideoTitle>{video.title}</VideoTitle> {/* This displays the Course Outline title */}
      <iframe width="620" height="390" src={videoUrl} title={currentVideo.title} frameBorder="0" allowFullScreen></iframe>
      <VideoDetails>
        <SynopsisTitle>Synopsis:</SynopsisTitle>
        <VideoSynopsis>{currentVideo.synopsis}</VideoSynopsis>
        <MarkComplete onClick={handleMarkComplete}>Mark as Complete</MarkComplete>
        {hasAlternatives && <SwitchVideoButton onClick={handleSwitchVideo}>Switch Video</SwitchVideoButton>}
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
  margin-right: 10px; 
`;

const SwitchVideoButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #1DE9B6;
  border: none;
  border-radius: 4px;
  color: black; // Changed color to black
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3; // Darken on hover for a subtle effect
  }

  &:disabled {
    background-color: #c0c0c0; // Grayed out if disabled
    cursor: not-allowed;
  }
`;

