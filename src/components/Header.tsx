import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

const StyledHeader = styled.header`
  display: flex;
  height: 6.4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;
  border-bottom: 0.1rem solid rgba(208, 208, 208, 1);
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
const Icon = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  gap: 0.5vw;
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  if (location.pathname === '/') return null;
  const refresh = () => {
    window.location.reload();
  };
  return (
    <StyledHeader>
      {/* 이미지 */}
      {isAuthenticated === 'false' ? (
        <StyledLink to="/">
          <StyledImg src="/logo.png" alt="logo" />
        </StyledLink>
      ) : (
        <StyledLink
          to="/main"
          onClick={() => {
            refresh();
          }}
        >
          <StyledImg src="/logo.png" alt="logo" />
        </StyledLink>
      )}

      {isAuthenticated === 'true' ? (
        <div style={{ display: 'flex' }}>
          <Icon
            type="button"
            className={Styles.p1bold}
            style={{
              border: 'none',
              background: 'none',
              color: 'rgba(255, 137, 35, 0.6)',
              cursor: 'pointer',
            }}
            onClick={() => {
              const id = sessionStorage.getItem('userId');
              navigate(`/mypage/${id}`);
            }}
          >
            마이페이지
          </Icon>
          <Icon
            type="button"
            className={Styles.p1bold}
            style={{
              border: 'none',
              background: 'none',
              color: 'rgba(255, 137, 35, 0.6)',
              cursor: 'pointer',
            }}
            onClick={() => {
              sessionStorage.clear();
              sessionStorage.setItem('isAuthenticated', 'false');
              alert('로그아웃 되었습니다.');
              window.location.href = '/';
            }}
          >
            로그아웃
          </Icon>
        </div>
      ) : null}
    </StyledHeader>
  );
}

export default Header;
