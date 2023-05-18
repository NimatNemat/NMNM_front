import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import StyledInput from '../components/StyledInput';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';

const PwdChangePageContainer = styled.div`
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  width: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`;

function PwdChangePage() {
  const navigate = useNavigate();
  const [pwdValue, setPwdValue] = useState<string>('');
  const [pwdCheckValue, setPwdCheckValue] = useState<string>('');

  const { id } = useParams<{ id: string }>();

  const handlePwdEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdValue(event.target.value);
  };
  const handlePwdCheckEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdCheckValue(event.target.value);
  };

  const ChangePwd = async (formData: FormData) => {
    try {
      const response = await axios.put('/users/change-password', formData);
      alert('비밀번호 변경이 완료됐습니다');
      sessionStorage.clear();
      sessionStorage.setItem('isAuthenticated', 'false');
      navigate('/login/');
    } catch (error) {
      alert('비밀번호 변경 실패');
    }
  };
  const Changefunction = () => {
    const formData = new FormData();
    if (id) {
      formData.append('userId', id);
    }

    if (!pwdValue) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!pwdCheckValue || pwdValue !== pwdCheckValue) {
      alert('비밀번호 확인창을 다시 확인하세요.');
      return;
    }
    formData.append('newPassword', pwdValue);

    ChangePwd(formData);
  };

  return (
    <PwdChangePageContainer className="LoginPage">
      <Container>
        <span className={Styles.h3}>비밀번호 변경</span>
        <InputContainer>
          <StyledInput
            value={pwdValue}
            type="password"
            placeholder="새 비밀번호"
            style={{ width: '100%' }}
            onChange={handlePwdEvent}
          />
          <StyledInput
            value={pwdCheckValue}
            type="password"
            placeholder="새 비밀번호 확인"
            style={{ width: '100%' }}
            onChange={handlePwdCheckEvent}
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                Changefunction();
              }
            }}
          />
        </InputContainer>
        <BtnContainer>
          <StyledButton onClick={Changefunction}>
            <span className={Styles.p1bold}>확인</span>
          </StyledButton>
          <StyledButton
            onClick={() => {
              navigate(`/main`);
            }}
            color="rgba(128, 128, 128, 1)"
          >
            <span className={Styles.p1bold}>취소</span>
          </StyledButton>
        </BtnContainer>
      </Container>
    </PwdChangePageContainer>
  );
}

export default PwdChangePage;
