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

  background-image: url('http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png');
  background-size: cover;
  background-position: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 137, 35, 0.6);
  font-size: 2.4rem;
  font-weight: 700;
  width: 35px;
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
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (location.pathname === '/') return null;
  return (
    <StyledHeader>
      {/* 이미지 */}
      {isAuthenticated === 'false' ? (
        <StyledLink to="/">
          <StyledImg src="/logo.png" alt="logo" />
        </StyledLink>
      ) : (
        <StyledLink to="/main">
          <StyledImg src="/logo.png" alt="logo" />
        </StyledLink>
      )}

      {isAuthenticated === 'true' ? (
        <div>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'none',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'rgba(255, 137, 35, 0.6)',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.location.href = '/modify';
            }}
          >
            정보수정페이지
          </button>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'none',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: 'rgba(255, 137, 35, 0.6)',
              cursor: 'pointer',
            }}
            onClick={() => {
              sessionStorage.setItem('isAuthenticated', 'false');
              alert('로그아웃 되었습니다.');
              window.location.href = '/';
            }}
          >
            로그아웃
          </button>
        </div>
      ) : null}
    </StyledHeader>
  );
}

export default Header;
