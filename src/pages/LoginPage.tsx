import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledInput from '../components/Input';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & h1 {
    margin: 0;
  }
  gap: 2.4rem;
  width: 60rem;
`;

function LoginPage() {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleIdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(event.target.value);
  };

  const handlePasswordEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const onClickfunction = () => {
    console.log('click');
  };

  return (
    <LoginPageContainer className="LoginPage">
      <Container>
        <span className={Styles.h3}>로그인</span>
        <StyledInput
          value={idValue}
          type="text"
          placeholder="아이디를 입력하세요."
          width="100%"
          onChange={handleIdEvent}
        />
        <StyledInput
          value={passwordValue}
          type="password"
          placeholder="비밀번호를 입력하세요."
          width="100%"
          onChange={handlePasswordEvent}
        />
        <Link
          to="/idsearch/"
          className={Styles.p1bold}
          style={{ alignSelf: 'flex-end', textDecoration: 'none', color: 'black' }}
        >
          로그인 정보를 잊으셨나요?
        </Link>
        <StyledButton onClick={onClickfunction}>Login</StyledButton>
        <Link
          to="/register/"
          className={Styles.p1bold}
          style={{ alignSelf: 'center', textDecoration: 'none', color: 'black' }}
        >
          아직 회원이 아니신가요?
        </Link>
      </Container>
    </LoginPageContainer>
  );
}

export default LoginPage;
