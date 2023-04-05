import React, { useState } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledInput from '../components/Input';
import StyledButton from '../components/StyledButton';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
`;

function IdFindComponent() {
  const [emailValue, setEmailValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const handleEmailEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const handleConfirmEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };
  const onClickfunction = () => {
    console.log('click');
  };
  return (
    <Div>
      <span className={Styles.p1bold}>가입하신 이메일로 아이디를 확인하세요</span>
      <StyledInput
        value={emailValue}
        type="email"
        placeholder="이메일을 입력해주세요"
        width="100%"
        onChange={handleEmailEvent}
      />
      <div style={{ height: '5rem', display: 'flex' }}>
        <StyledButton onClick={onClickfunction}>인증번호 발송</StyledButton>
      </div>
      <StyledInput
        value={confirmValue}
        type="number"
        placeholder="인증번호를 입력해주세요"
        width="100%"
        onChange={handleConfirmEvent}
      />
      <StyledButton onClick={onClickfunction}>인증번호 확인</StyledButton>
    </Div>
  );
}
export default IdFindComponent;
