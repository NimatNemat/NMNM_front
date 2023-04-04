import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

const StyledHeader = styled.header`
  display: flex;
  height: 74px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;
const Usericon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #a5a5a5;
`;
const Logo = styled.h2`
  color: rgba(255, 137, 35, 0.6);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 137, 35, 0.6);
  font-size: 24px;
  font-weight: 700;
`;

function Header() {
  return (
    <StyledHeader>
      {/* 이미지 */}
      <StyledLink to="/">NimatNemat</StyledLink>

      <Usericon />
    </StyledHeader>
  );
}

export default Header;
