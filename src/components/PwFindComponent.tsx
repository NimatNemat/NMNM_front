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
const Btnbox = styled.div`
  display: flex;
  width: 100%;
  height: 5.6rem;
  justify-content: center;
  align-items: center;
`;
function PwFindComponent() {
  const [idValue, setIdValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const handleIdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdValue(event.target.value);
  };
  const handleConfirmEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmValue(event.target.value);
  };
  const onClickfunction = () => {
    console.log('click');
  };
  return (
    <Div>
      <span className={Styles.p1bold}>가입하신 아이디로 비밀번호를 확인하세요</span>
      <StyledInput
        value={idValue}
        type="text"
        placeholder="아이디를 입력해주세요"
        width="100%"
        onChange={handleIdEvent}
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
export default PwFindComponent;
