import React from 'react';
import styled from 'styled-components';

const VideoCard = ({ video }) => {
  return (
    <CardWrapper>
      <Thumbnail src={video.thumbnail} />
      <VideoDetails>
        <SynopsisTitle>Synopsis:</SynopsisTitle>
        <VideoSynopsis>{video.synopsis}</VideoSynopsis>
        <MarkComplete>Mark as Complete</MarkComplete>
      </VideoDetails>
    </CardWrapper>
  );
};
export default VideoCard;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

const Thumbnail = styled.img`
  width: 420px;
  height: 290px;
  margin-right: 40px;
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
  margin-bottom: 20px; // Add some space below the title
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
