import styled from 'styled-components';
import React from 'react';


const ContentsTitle = styled.h2`
  color: #1DE9B6;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;

const ChapterTitle = styled.p`
  color: #40C4FF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-left: 20px;
`;

const CourseContents = () => {
    const chapters = [
      'Understanding Wildlife',
      'Mastering Camera Settings',
      'Composition and Framing',
      'Patience and Fieldcraft',
      'Post-processing'
    ];
  
    return (
      <div>
        <ContentsTitle>Contents:</ContentsTitle>
        {chapters.map((chapter, index) => (
          <ChapterTitle key={index}>{index+1}. {chapter}</ChapterTitle>
        ))}
      </div>
    );
  };
  
  export default CourseContents;
  