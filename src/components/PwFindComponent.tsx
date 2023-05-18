import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledInput from './StyledInput';
import StyledButton from '../components/StyledButton';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
`;
const Btnbox = styled.div`
  display: flex;
  width: 100%;
  height: 5.6rem;
  justify-content: center;
  align-items: center;
`;
function PwFindComponent() {
  const [idValue, setIdValue] = useState('');
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [confirmValue, setConfirmValue] = useState('');
  const navigate = useNavigate();
  const handleIdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(event.target.value);
  };
  const handleConfirmEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };
  const handleSubmitClick = () => {
    const formData = new FormData();
    if (!idValue) {
      alert('아이디를 입력해주세요');
      return;
    }
    formData.append('identifier', idValue);
    sendCode(formData);
  };
  const sendCode = async (formData: FormData) => {
    try {
      const response = await axios.post('/mail/send', formData);
      if (response.status === 200) {
        alert('가입하신 이메일로 인증번호 발송완료');
        setIsCodeSent(true);
      }
    } catch (error) {
      alert('아이디를 다시 한번 확인하세요.');
    }
  };
  const handleConfirmClick = () => {
    const formData = new FormData();
    if (!isCodeSent) {
      alert('아이디를 먼저 입력해주세요.');
      return;
    }
    if (!confirmValue) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    formData.append('identifier', idValue);
    formData.append('code', confirmValue);
    verifyCode(formData);
  };
  const verifyCode = async (formData: FormData) => {
    try {
      const response = await axios.post('/mail/verify', formData);
      sessionStorage.setItem('pwdAuthenticated', 'true');
      navigate(`/pwdchange/${idValue}`);
    } catch (error) {
      alert('오류');
    }
  };
  return (
    <Div>
      <span className={Styles.p1bold}>가입하신 아이디로 비밀번호를 확인하세요</span>
      <StyledInput
        value={idValue}
        type="text"
        placeholder="아이디를 입력해주세요"
        style={{ width: '100%' }}
        onChange={handleIdEvent}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            handleSubmitClick();
          }
        }}
      />
      <Btnbox>
        <StyledButton onClick={handleSubmitClick}>
          <span className={Styles.p1bold}>인증번호 발송</span>
        </StyledButton>
      </Btnbox>
      <StyledInput
        value={confirmValue}
        type="number"
        placeholder="인증번호를 입력해주세요"
        style={{ width: '100%' }}
        onChange={handleConfirmEvent}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            handleConfirmClick();
          }
        }}
      />
      <Btnbox>
        <StyledButton onClick={handleConfirmClick}>
          <span className={Styles.p1bold}>인증번호 확인</span>
        </StyledButton>
      </Btnbox>
    </Div>
  );
}
export default PwFindComponent;
