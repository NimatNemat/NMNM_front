import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import StyledInput from '../components/StyledInput';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';

function ModifyPage() {
  const [nicknameValue, setNicknameValue] = useState('');
  const [detailValue, setDetailValue] = useState<string>('');
  const [data, setData] = useState('');
  const handledataEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  const handleNicknameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
  };
  const handleDetailEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetailValue(event.target.value);
  };
  const modifyUser = async (formData: FormData) => {
    try {
      const response = await axios.post('#', formData);
      window.location.href = '/main';
    } catch (error) {
      alert('에러');
    }
  };
  const loadUser = async () => {
    try {
      const response = await axios.get('#');
      setNicknameValue(response.data.nickname);
      setDetailValue(response.data.detail);
    } catch (error) {
      alert('에러');
    }
  };

  const Submitfunction = () => {
    const formData = new FormData();
    formData.append('nickname', nicknameValue);
    formData.append('detail', detailValue);
    modifyUser(formData);
  };

  return (
    <ModifyPageContainer>
      <Container>
        <span className={Styles.h3}>회원 정보 수정</span>
        <span className={Styles.p1bold}>닉네임</span>
        <StyledInput
          value={nicknameValue}
          type="text"
          placeholder="변경할 닉네임을 입력해주세요."
          width="100%"
          onChange={handleNicknameEvent}
        />
        <span className={Styles.p1bold}>입맛</span>
        <StyledInput value={data} type="text" placeholder="입맛변경" width="100%" onChange={handledataEvent} />
        <span className={Styles.p1bold}>세부 사항</span>
        <Div>
          <DetailArea value={detailValue} onChange={handleDetailEvent} />
        </Div>
        <EndBox>
          <Row>
            <div>
              <StyledButton onClick={Submitfunction} color="F2F4F6">
                <span className={Styles.p1bold}>취소</span>
              </StyledButton>
            </div>
            <div>
              <StyledButton onClick={Submitfunction}>
                <span className={Styles.p1bold}>수정하기</span>
              </StyledButton>
            </div>
          </Row>
        </EndBox>
      </Container>
    </ModifyPageContainer>
  );
}
const ModifyPageContainer = styled.div`
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
  width: 50%;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 50%;
  gap: 1.2rem;
`;
const EndBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
`;
const DetailArea = styled.textarea`
  border: 1px solid #dfdfdf;
  padding: 1.6rem 1.6rem;
  width: 100%;
  height: 10rem;
  background-color: #fffdf5;
  resize: none;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${css`
    color: rgba(128, 128, 128, 0.3);
  `}
`;

export default ModifyPage;
