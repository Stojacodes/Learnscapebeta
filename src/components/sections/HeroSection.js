import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import SearchBarComponent from "../layout/SearchBarComponent"





function HeroSection() {
  return (
    <Wrapper>
    <ContentWrapper>
        <ImageWrapper>
        <img src="/images/logos/ads_click.svg" alt="ads_click" />
        <img src="/images/logos/visibility.svg" alt="visibility" />
        <img src="/images/logos/school.svg" alt="school" />
        </ImageWrapper>
        <p>Generate a video course on anything in just one click...</p>
       <SearchBarComponent />
        <Link to="/page-2/">advanced search</Link> <br />  
    </ContentWrapper>
    </Wrapper>
  )
}

export default HeroSection

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // This makes the wrapper take the full height of the viewport
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 54px;
  width: 952px;
  height: 312px;
  margin-top: -350px;
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 16px; // Adjust this for the space between the images

  img {
    width: 100px; // Adjust this for the image width
    height: 70px; // This keeps the aspect ratio of the images
  }
`;
