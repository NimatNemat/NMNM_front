import React, { useState } from 'react';
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
        width="100%"
        onChange={handleEmailEvent}
      />
      <Btnbox>
        <StyledButton onClick={onClickfunction}>
          <span className={Styles.p1bold}>인증번호 발송</span>
        </StyledButton>
      </Btnbox>
      <StyledInput
        value={confirmValue}
        type="number"
        placeholder="인증번호를 입력해주세요"
        width="100%"
        onChange={handleConfirmEvent}
      />
      <Btnbox>
        <StyledButton onClick={onClickfunction}>
          <span className={Styles.p1bold}>인증번호 확인</span>
        </StyledButton>
      </Btnbox>
    </Div>
  );
}
export default IdFindComponent;
