import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

function Header() {
    return (
      <Nav>
        <Logo>
          <img src="/images/logos/school2.svg" alt="School Logo" />
          <div>Learnscape</div>
        </Logo>
        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/page-2/">How It Works</MenuItem>
          <MenuItem to="/page-2/">About</MenuItem>
        </Menu>
        <Button to="/page-2/">
          <img src="/images/logos/auto_awesome.svg" alt="Awesome Icon" style={{ marginLeft: '8px' }} />
          Create New Course
        </Button>
      </Nav>
    )
  }

  export default Header

  const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 2rem 6rem;
    gap: 8px;
    top: 50px;
  
  `;

  const Logo = styled.div`
    display: flex;
    align-items: center
    gap 10px;

    img {
    width: 36.6px;
    height: 30px;
    font-weight: 700;
    margin-right: 10px;

  }

  div {
    color: #1DE9B6;
    font-size: 32px;
  }
  `;
  
  

const Menu = styled.div`
display: flex;
gap: 20px;
font-size: 16px;
margin-right: 33rem;
`;

const MenuItem = styled(Link)`
color: #fff;
text-decoration: none;
font-weight: 200;
`;

const Button = styled(Link)`
  display: flex; // Change this from inline-block to flex for aligning text and image
  align-items: center; // For vertically aligning the text and the image
  justify-content: space-between; // For horizontally aligning the text and the image
  flex-direction: row-reverse;
  padding: 0px 24px;
  background-color: #1DE9B6;
  color: #000;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;

  width: 231px;
  height: 40px;

  background: #1DE9B6;
  border-radius: 100px;
`;

