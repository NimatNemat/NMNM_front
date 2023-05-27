import React from 'react';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import Styles from '../config/globalFontStyle.module.css';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vw;
  width: 100%;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function ErrorPage() {
  const MainPage = () => {
    window.location.href = '/main';
  };

  return (
    <Div>
      <Center>
        <TextDiv className={Styles.h2}>오류페이지</TextDiv>
        <TextDiv className={Styles.h3}>페이지를 찾을 수 없습니다.</TextDiv>
        <div>
          <StyledButton onClick={MainPage}>
            <TextDiv className={Styles.p1bold}>메인으로 돌아가기</TextDiv>
          </StyledButton>
        </div>
      </Center>
    </Div>
  );
}

export default ErrorPage;
