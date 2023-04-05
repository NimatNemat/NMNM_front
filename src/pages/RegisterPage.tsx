import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledInput from '../components/Input';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.4rem;
  width: 60rem;
  /* margin-top: rem; */
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const Linebox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  white=space: nowrap;
`;
const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white=space: nowrap;
  width: 12rem;
`;
const Line = styled.div`
  height: 0.3rem;
  background-color: rgba(255, 137, 35, 0.6);
  width: 100%;
`;

const PrivacyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;
const Checkbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  border: 0.1rem solid rgba(255, 137, 35, 0.6);
  border-radius: 0.8rem;
  margin-right: 0.8rem;
`;

const PrivacyLink = styled(Link)`
  color: rgba(128, 128, 128);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function RegisterPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [privacy1, setPrivacy1] = useState(false);
  const [privacy2, setPrivacy2] = useState(false);
  const [privacy3, setPrivacy3] = useState(false);
  const [check, setcheck] = useState(false);
  const AllCheck = () => {
    if (check === true) {
      setPrivacy1(false);
      setPrivacy2(false);
      setPrivacy3(false);
      setcheck(false);
    } else {
      setPrivacy1(true);
      setPrivacy2(true);
      setPrivacy3(true);
      setcheck(true);
    }
  };

  const handleIdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handlePasswordEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePassword2Event = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value);
  };
  const handleEmailEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const Submit = () => {
    if (
      id === '' ||
      password === '' ||
      password2 === '' ||
      email === '' ||
      privacy1 === false ||
      privacy2 === false ||
      privacy3 === false
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (id.length < 6) {
      alert('아이디는 6자 이상이어야 합니다.');
      return;
    }

    if (email.indexOf('@') === -1) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    alert('회원가입이 완료되었습니다.');
  };

  return (
    <RegisterPageContainer>
      <Container>
        <span className={Styles.h3}>회원 정보</span>
        <InputContainer>
          <Line />
          <Linebox>
            <SubTitle className={Styles.p1bold}>아이디</SubTitle>
            <StyledInput
              value={id}
              type="text"
              placeholder="아이디를 입력하세요."
              width="100%"
              onChange={handleIdEvent}
            />
          </Linebox>
          <Linebox>
            <SubTitle className={Styles.p1bold}>비밀번호</SubTitle>
            <StyledInput
              value={password}
              type="password"
              placeholder="비밀번호를 입력하세요."
              width="100%"
              onChange={handlePasswordEvent}
            />
          </Linebox>
          <Linebox>
            <SubTitle className={Styles.p1bold}>비밀번호 확인</SubTitle>
            <StyledInput
              value={password2}
              type="password"
              placeholder="비밀번호를 입력하세요."
              width="100%"
              onChange={handlePassword2Event}
            />
          </Linebox>
          <Linebox>
            <SubTitle className={Styles.p1bold}>이메일</SubTitle>
            <StyledInput
              value={email}
              type="email"
              placeholder="이메일을 입력하세요."
              width="100%"
              onChange={handleEmailEvent}
            />
          </Linebox>
          <Line />
        </InputContainer>
        <span className={Styles.h3}>개인정보 수집 및 이용 동의</span>
        <PrivacyContainer>
          <Linebox>
            <Linebox>
              <Checkbox type="checkbox" checked={check} onChange={AllCheck} />
              <span className={Styles.p1bold}>전체 동의</span>
            </Linebox>
            <PrivacyLink to="/privacy" className={Styles.p1midium}>
              개인정보 처리 방침 약관보기
            </PrivacyLink>
          </Linebox>
          <Line />
          <Linebox>
            <Checkbox type="checkbox" checked={privacy1} onChange={() => setPrivacy1(!privacy1)} />
            <span className={Styles.p1regular}>개인정보 수집 및 이용 동의</span>
          </Linebox>
          <Linebox>
            <Checkbox type="checkbox" checked={privacy2} onChange={() => setPrivacy2(!privacy2)} />
            <span className={Styles.p1regular}>개인정보 제3자 제공 동의</span>
          </Linebox>

          <Linebox>
            <Checkbox type="checkbox" checked={privacy3} onChange={() => setPrivacy3(!privacy3)} />
            <span className={Styles.p1regular}>마케팅 정보 수신 동의</span>
          </Linebox>
        </PrivacyContainer>
        <StyledButton onClick={Submit}>회원가입</StyledButton>
      </Container>
    </RegisterPageContainer>
  );
}

export default RegisterPage;
