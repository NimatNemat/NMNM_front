import React, { useState, useEffect, useRef } from 'react';
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
  height: 64rem;
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
const StyledImage = styled.img`
  width: 50%;
  object-fit: cover;
`;
const StyledTextDiv = styled.div<{ alignItems: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ alignItems }) => alignItems};
  gap: 0.8rem;
  width: 50%;
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
  const [className, setClassName] = useState<string>('');
  const onClickFunction = () => {
    window.location.href = '/login';
  };
  const contentRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  contentRefs.current = [0, 1, 2, 3, 4].map((_, i) => contentRefs.current[i] ?? React.createRef());

  useEffect(() => {
    const onScroll = () => {
      contentRefs.current.forEach((ref) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
            ref.current.classList.add(Styles.visible);
          } else {
            ref.current.classList.remove(Styles.visible);
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateClassName = () => {
      if (window.innerWidth <= 767) {
        setClassName(Styles.mobileH3);
      } else if (window.innerWidth <= 1439) {
        setClassName(Styles.tabletH3);
      } else {
        setClassName(Styles.desktopH3);
      }
    };

    updateClassName();
    window.addEventListener('resize', updateClassName);

    return () => {
      window.removeEventListener('resize', updateClassName);
    };
  }, []);

  return (
    <IntroPageContainer>
      <FirstContainer backGround="none">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv alignItems="flex-start">
            <div className={className} style={{ color: '#FFFFFF', width: '100%' }}>
              내 입맛에 맞는 식당
            </div>
            <div className={className} style={{ color: '#FFFFFF', width: '100%' }}>
              니맛내맛에서 확인하세요
            </div>
          </StyledTextDiv>
        </ContentContainer>
      </FirstContainer>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv
            alignItems="flex-start"
            ref={contentRefs.current[0]}
            className={`${Styles.fadeInOnScroll} ${Styles.visible}`}
          >
            <div className={className}>세상에 없던</div>
            <div className={className}>새로운 추천</div>
            <div className={Styles.p1regular}>개인의 취향분석을 통해</div>
            <div className={Styles.p1regular}>같은 그룹에 속한 사람들로부터 추천받기</div>
          </StyledTextDiv>
          <StyledImage src="/logo.png" alt="" />
        </ContentContainer>
      </Container>
      <Container backGround="#FFFFFF">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv
            alignItems="flex-start"
            ref={contentRefs.current[1]}
            className={`${Styles.fadeInOnScroll} ${Styles.visible}`}
          >
            <div className={className}>나만의</div>
            <div className={className}>맛집리스트</div>
            <div className={Styles.p1regular}>자신이 원하는 테마별로</div>
            <div className={Styles.p1regular}>맛집을 저장해 보세요!</div>
          </StyledTextDiv>
          <StyledImage src="/logo.png" alt="" />
        </ContentContainer>
      </Container>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv
            alignItems="flex-start"
            ref={contentRefs.current[2]}
            className={`${Styles.fadeInOnScroll} ${Styles.visible}`}
          >
            <div className={className}>우리 뭐 먹을래?</div>
            <div className={Styles.p1regular}>친구와 함께 맛집을 찾아보세요!</div>
          </StyledTextDiv>
          <StyledImage src="/logo.png" alt="" />
        </ContentContainer>
      </Container>
      <Container backGround="#FFFFFF">
        <ContentContainer justifyContent="flex-start">
          <StyledTextDiv
            alignItems="flex-start"
            ref={contentRefs.current[3]}
            className={`${Styles.fadeInOnScroll} ${Styles.visible}`}
          >
            <div className={className}>여기 뭐라쓰지?</div>
            <div className={Styles.p1regular}>내가 쓴 리뷰,</div>
            <div className={Styles.p1regular}>좋아요한 식당</div>
            <div className={Styles.p1regular}>나만의 맛플리</div>
            <div className={Styles.p1regular}>친구들과 공유해보세요!</div>
          </StyledTextDiv>
          <StyledImage src="/logo.png" alt="" />
        </ContentContainer>
      </Container>
      <Container backGround="#FFFDF5">
        <ContentContainer justifyContent="center">
          <FooterContainer ref={contentRefs.current[4]} className={`${Styles.fadeInOnScroll} ${Styles.visible}`}>
            <StyledLogoDiv>
              <img src="/logo.png" alt="logo" style={{ width: '12.5rem', height: '5rem' }} />
            </StyledLogoDiv>
            <StyledTextDiv alignItems="center">
              <div className={className}>지금 니맛내맛에서</div>
              <div className={className}>내 취향 맛집을 추천받아보세요</div>
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
