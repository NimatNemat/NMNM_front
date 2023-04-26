import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import StyledInput from '../components/StyledInput';
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
  width: 36rem;
`;

function LoginPage() {
  const navigate = useNavigate();
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleIdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(event.target.value);
  };

  const handlePasswordEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const loginUser = async (formData: FormData) => {
    try {
      const response = await axios.post('/users/login', formData);
      if (response.status === 200) {
        navigate('/main/');
        // accessToken 설정
        axios.defaults.headers.common.Authorization = `Bearer ${response.data}`;
        sessionStorage.setItem('isAuthenticated', '');
      } else {
        alert('아이디, 비밀번호를 다시 한번 확인하세요.');
      }
    } catch (error) {
      alert('아이디, 비밀번호를 다시 한번 확인하세요.');
    }
  };
  const Loginfunction = () => {
    const formData = new FormData();

    if (!idValue) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!passwordValue) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    formData.append('userId', idValue);
    formData.append('password', passwordValue);

    loginUser(formData);
  };

  return (
    <LoginPageContainer className="LoginPage">
      <Container>
        <span className={Styles.h3}>로그인</span>
        <StyledInput
          value={idValue}
          type="text"
          placeholder="아이디를 입력하세요."
          style={{ width: '100%' }}
          onChange={handleIdEvent}
        />
        <StyledInput
          value={passwordValue}
          type="password"
          placeholder="비밀번호를 입력하세요."
          style={{ width: '100%' }}
          onChange={handlePasswordEvent}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              Loginfunction();
            }
          }}
        />
        <Link
          to="/idsearch/"
          className={Styles.p1bold}
          style={{ alignSelf: 'flex-end', textDecoration: 'none', color: 'black' }}
        >
          로그인 정보를 잊으셨나요?
        </Link>
        <StyledButton onClick={Loginfunction}>
          <span className={Styles.p1bold}>Login</span>
        </StyledButton>
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
