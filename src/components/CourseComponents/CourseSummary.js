import React from 'react';
import styled from 'styled-components';

const CourseSummary = () => {
  return (
    <SummaryWrapper>
      <SummaryTitle>Summary</SummaryTitle>
      <SummaryText>
        This course provides a comprehensive introduction to wildlife photography, covering the essential aspects that every aspiring wildlife photographer should understand. From understanding wildlife behavior and habitats to mastering camera settings, composition techniques, and post-processing, this course will equip you with the knowledge and skills needed to capture stunning images of wildlife. Each step focuses on a specific aspect of wildlife photography and provides practical tips and techniques to enhance your photography skills in that area.
      </SummaryText>
    </SummaryWrapper>
  );
};

export default CourseSummary;

const SummaryWrapper = styled.div`
  margin: 20px 0;
`;

const SummaryTitle = styled.h2`
  color: #1DE9B6;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SummaryText = styled.p`
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
