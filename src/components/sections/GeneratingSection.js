import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import SearchBarComponent from "../layout/SearchBarComponent"



function GeneratingSection() {
    return (
      <Wrapper>
      <ContentWrapper>
         <SearchBarComponent />
         <TextWrapper>
           <img src="/images/logos/Ellipse1.svg" alt="Ellipse1" />
           <p>Generating course structure...</p>
         </TextWrapper>
         <HorizontalLine>
         </HorizontalLine>
      </ContentWrapper>
      </Wrapper>
    )
  }
  

export default GeneratingSection

const HorizontalLine = styled.div`
  width: 116%; // full width
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); // white line
  margin-top: -35px; // some margin to space out the line from the text
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This makes the wrapper take the full height of the viewport
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 54px;
  width: 952px;
  height: 312px;
  margin-top: -350px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center; // this centers items vertically
  justify-content: flex-start; // this aligns items to the left
  gap: 10px; // this adds some space between the image and the text

`;


