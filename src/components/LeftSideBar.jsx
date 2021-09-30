import { CleevioContext } from "../context/CleevioState";
import { GiHamburgerMenu } from "react-icons/gi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { YellowButton } from "../GlobalStyles";
import React, { useContext, useEffect, useState } from "react";
import clock_black from "../imgs/clock_black.png";
import clock_gray from "../imgs/clock_gray.png";
import logo from "../imgs/logo.png";
import styled from "styled-components";
function LeftSideBar(props) {
  const { width } = useContext(CleevioContext);
  const [isMobile, setIsMobile] = useState(false);
  const handleClick = () => {
    setIsMobile(!isMobile);
  };

  const getLocation = window.location.pathname;
  return (
    <LeftSideBarDiv>
      <Link to="/">
        <LogoDiv src={logo} alt="" />
      </Link>
      <MobileMenu onClick={handleClick}>
        <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </MobileMenu>
      {isMobile && width < 550 ? (
        <PhoneMenuLinks>
          <MobileDiv>
            <Link to="/">
              <LogoDiv src={logo} alt="" />
            </Link>
          </MobileDiv>
          <MobileMenu onClick={handleClick}>X</MobileMenu>
          <YellowButton size="5rem" to="/trip">
            <p>New Trip</p>
            <p>+</p>
          </YellowButton>
          <ClockButton white disabled={getLocation === "/trip" ? true : false}>
            {getLocation === "/trip" ? (
              <Clock src={clock_gray} alt="clock" />
            ) : (
              <Clock src={clock_black} alt="clock" />
            )}
            Your Trips
          </ClockButton>
        </PhoneMenuLinks>
      ) : (
        <MenuLinks>
          <YellowButton to="/trip">
            <p>New Trip</p>
            <p>+</p>
          </YellowButton>
          <Link to="/">
            {" "}
            <ClockButton disabled={getLocation === "/trip" ? true : false}>
              {getLocation === "/trip" ? (
                <Clock src={clock_gray} alt="clock" />
              ) : (
                <Clock src={clock_black} alt="clock" />
              )}
              Your Trips
            </ClockButton>
          </Link>
        </MenuLinks>
      )}
    </LeftSideBarDiv>
  );
}

export default LeftSideBar;
const LeftSideBarDiv = styled.div`
  background-color: #f9f9fa;
  grid-area: leftSidebar;
  padding: 1rem 2rem;
  @media (max-width: 550px) {
    display: flex;
    height: 30px;
    background-color: white;
  }
`;
const MobileMenu = styled.button`
  vertical-align: bottom;
  background-color: #f1f1f2;
  font-weight: 200;
  font-size: 1.33rem;
  color: #76787b;
  display: none;
  @media (max-width: 550px) {
    border-radius: 10px;
    border: none;
    display: block;
    position: absolute;
    left: 25px;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
`;
const LogoDiv = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  text-align: center;
  @media (max-width: 550px) {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;
const MenuLinks = styled.div`
  flex-direction: column;
  @media (max-width: 550px) {
    display: none;
    height: 30px;
  }
`;
const MobileDiv = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const Clock = styled.img`
  margin-right: 0.5rem;
`;
const ClockButton = styled.button`
  margin-top: 2rem;
  border: none;
  background-color: ${(props) => (props.white ? "white" : "#f9f9fa")};
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
`;

const PhoneMenuLinks = styled.div`
  @media (max-width: 550px) {
    display: relative;
    position: absolute;
    padding-left: inherit;
    padding-right: inherit;
    position: fixed;
    padding-top: 1rem;
    right: 0;
    list-style: none;
    background-color: white;
    left: 0;
    top: 0;
    transition: all 0.5 ease-out;
    height: 100vh;
  }
`;