import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

function IdFindComponent() {
  const [emailValue, setEmailValue] = useState<string>('');
  const [confirmValue, setConfirmValue] = useState<string>('');
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleEmailEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const handleConfirmEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };
  const handleSubmitClick = () => {
    const formData = new FormData();
    if (!emailValue) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (emailValue.indexOf('@') === -1) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    formData.append('identifier', emailValue);
    sendCode(formData);
  };
  const sendCode = async (formData: FormData) => {
    try {
      const response = await axios.post('/mail/send', formData);
      if (response.status === 200) {
        alert('인증번호 발송완료');
        setIsCodeSent(true);
      }
    } catch (error) {
      alert('이메일을 다시 한번 확인하세요.');
    }
  };
  const handleConfirmClick = () => {
    const formData = new FormData();
    if (!isCodeSent) {
      alert('이메일을 먼저 입력해주세요.');
      return;
    }
    if (!confirmValue) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    formData.append('identifier', emailValue);
    formData.append('code', confirmValue);
    verifyCode(formData);
  };
  const verifyCode = async (formData: FormData) => {
    try {
      const response = await axios.post('/mail/verify', formData);
      if (response.data) {
        alert(`'아이디는' ${response.data} 입니다`);
        navigate('/login/');
      } else {
        alert('인증번호를 다시 확인하세요');
      }
    } catch (error) {
      alert('오류');
    }
  };
  const Btnbox = styled.div`
    display: flex;
    width: 100%;
    height: 5.6rem;
    justify-content: center;
    align-items: center;
  `;

  return (
    <Div>
      <span className={Styles.p1bold}>가입하신 이메일로 아이디를 확인하세요</span>
      <StyledInput
        value={emailValue}
        type="email"
        placeholder="이메일을 입력해주세요"
        style={{ width: '100%' }}
        onChange={handleEmailEvent}
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
        type="text"
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
export default IdFindComponent;
