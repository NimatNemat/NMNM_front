import React from 'react';
import styled from 'styled-components';
import StyledButton from '../components/StyledButton';
import Styles from '../config/globalFontStyle.module.css';
import backgroundImage from '../assets/img/intro.jpg';

const IntroPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: -7.4rem;
`;
const Container = styled.div<{ backGround: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 36rem;
  height: 40rem;
  background: ${({ backGround }) => backGround};
`;
const FirstContainer = styled(Container)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const ContentContainer = styled.div<{ justifyContent: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: center;
  width: 60%;
  height: 100%;
  gap: 0.8rem;

  @media (max-width: 470px) {
    width: 80%;
  }
`;
const StyledLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledTextDiv = styled.div<{ alignItems: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ alignItems }) => alignItems};
  gap: 0.8rem;
`;
const StyledButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 4.5rem;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6vh;
`;

function IntroPage() {
  const onClickFunction = () => {
    window.location.href = '/login';
  };
  return (
    <IntroPageContainer>
      <FirstContainer backGround="none">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={Styles.h3} style={{ color: '#FFFFFF', width: '100%' }}>
              내 입맛에 맞는 식당
            </div>
            <div className={Styles.h3} style={{ color: '#FFFFFF', width: '100%' }}>
              니맛내맛에서 확인하세요
            </div>
          </StyledTextDiv>
        </ContentContainer>
      </FirstContainer>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={Styles.h3}>세상에 없던</div>
            <div className={Styles.h3}>새로운 추천</div>
            <div className={Styles.p1regular}>개인의 취향분석을 통해</div>
            <div className={Styles.p1regular}>같은 그룹에 속한 사람들로부터 추천받기</div>
          </StyledTextDiv>
        </ContentContainer>
      </Container>
      <Container backGround="#FFFFFF">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={Styles.h3}>나만의</div>
            <div className={Styles.h3}>맛집리스트</div>
            <div className={Styles.p1regular}>자신이 원하는 테마별로</div>
            <div className={Styles.p1regular}>맛집을 저장해 보세요!</div>
          </StyledTextDiv>
        </ContentContainer>
      </Container>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={Styles.h3}>우리 뭐 먹을래?</div>
            <div className={Styles.p1regular}>친구와 함께 맛집을 찾아보세요!</div>
          </StyledTextDiv>
        </ContentContainer>
      </Container>
      <Container backGround="#FFFFFF">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={Styles.h3}>여기 뭐라쓰지?</div>
            <div className={Styles.p1regular}>내가 쓴 리뷰,</div>
            <div className={Styles.p1regular}>좋아요한 식당</div>
            <div className={Styles.p1regular}>나만의 맛플리</div>
            <div className={Styles.p1regular}>친구들과 공유해보세요!</div>
          </StyledTextDiv>
        </ContentContainer>
      </Container>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="center">
          <FooterContainer>
            <StyledLogoDiv>
              <img src="/logo.png" alt="logo" style={{ width: '12.5rem', height: '5rem' }} />
            </StyledLogoDiv>
            <StyledTextDiv alignItems="center">
              <div className={Styles.h3}>지금 니맛내맛에서</div>
              <div className={Styles.h3}>내 취향 맛집을 추천받아보세요</div>
            </StyledTextDiv>
            <StyledButtonDiv>
              <StyledButton
                color="rgba(255, 137, 35, 0.6)"
                onClick={onClickFunction}
                padding="0.8rem 1.6rem"
                borderRadius="5rem"
              >
                <div className={Styles.p1bold}>시작하기</div>
              </StyledButton>
            </StyledButtonDiv>
          </FooterContainer>
        </ContentContainer>
      </Container>
    </IntroPageContainer>
  );
}

export default IntroPage;
