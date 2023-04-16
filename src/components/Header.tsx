import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  height: 7.4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;
  border-bottom: 0.1rem solid rgba(208, 208, 208, 1);
`;
const Usericon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #a5a5a5;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 137, 35, 0.6);
  font-size: 2.4rem;
  font-weight: 700;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const StyledImg = styled.img`
  width: 12.5rem;
  height: 5rem;
`;

function Header() {
  const location = useLocation();
  if (location.pathname === '/intro/') return null;
  return (
    <StyledHeader>
      {/* 이미지 */}
      <StyledLink to="/">
        <StyledImg src="/logo.png" alt="logo" />
      </StyledLink>
      <Usericon />
    </StyledHeader>
  );
}

export default Header;
