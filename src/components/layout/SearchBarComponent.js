import React from "react";
import styled from "styled-components";

function SearchBarComponent() {
  return (
    <SearchWrapper>
      <SearchBarContainer>
        <SearchInput type="search" placeholder="e.g. Fermat's Last Theorem, Skateboarding, Jazz Guitar..." />
        <SearchButton>     
          <img src="/images/logos/auto_awesome.svg" alt="Awesome Icon" style={{ marginLeft: '15px' }} />
         Create New Course
         </SearchButton>
      </SearchBarContainer>
    </SearchWrapper>
  );
}

export default SearchBarComponent;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SearchBarContainer = styled.div`
  display: flex;
  width: 80%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
`;


const SearchInput = styled.input`
  width: 79%;
  height: 40px;
  padding: 8px 16px;
  font-size: 16px;
  background: transparent;
  border: none;
  color: white;
`;

const SearchButton = styled.button`
  display: flex; // Change this from inline-block to flex for aligning text and image
  align-items: center; // For vertically aligning the text and the image
  flex-direction: row-reverse;
  width: 30%;
  height: 40px;
  padding: 8px 16px;
  font-size: 16px;
  background: #1DE9B6;
  border: none;
  border-radius: 0 20px 20px 0;
  color: black;
  cursor: pointer;
`;
