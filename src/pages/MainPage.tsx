import React from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledTag from '../components/Tag';
import StyledCard from '../components/CardItem';

const MainPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  /* @media (max-width: 600px) {
    width: 100%;
  } */
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  width: 100%;
  align-items: flex-start;
  /* @media (max-width: 470px) {
    justify-content: center;
    align-items: center;
  } */
`;

const TagListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  /* @media (max-width: 470px) {
    justify-content: center;
  } */
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vh;
  width: 100%;
  @media (max-width: 470px) {
    justify-content: center;
    align-items: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  /* grid-template-rows: repeat(3, 1fr); */
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
  /* @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
    place-items: center;
  } */
`;

const icons = require.context('../assets/icons', true);

function MainPage() {
  return (
    <MainPageContainer className="MainPage">
      <Container>
        <ListContainer>
          <TagContainer>
            <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
              종류
            </div>
            <TagListContainer>
              <StyledTag imgSrc={icons('./korea.png')} text="한식" />
              <StyledTag imgSrc={icons('./china.png')} text="중식" />
              <StyledTag imgSrc={icons('./japan.png')} text="일식" />
              <StyledTag imgSrc={icons('./us.png')} text="양식" />
            </TagListContainer>
            <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
              태그
            </div>
            <TagListContainer>
              <StyledTag imgSrc={icons('./korea.png')} text="한식" />
              <StyledTag imgSrc={icons('./china.png')} text="중식" />
              <StyledTag imgSrc={icons('./japan.png')} text="일식" />
              <StyledTag imgSrc={icons('./us.png')} text="양식" />
            </TagListContainer>
            <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
              함께먹기
            </div>
            <TagListContainer>
              <StyledTag imgSrc={icons('./korea.png')} text="한식" />
              <StyledTag text="+" />
            </TagListContainer>
          </TagContainer>
          <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
            진정한 한국인의 추천리스트
          </div>
          <GridContainer>
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/logo.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
            <StyledCard
              imgSrc="/img.png"
              likes="12개"
              name="마리모"
              category="돈까스, 우동"
              hashtag="#일식 가정식 #혼밥 #제로페이"
            />
          </GridContainer>
        </ListContainer>
      </Container>
    </MainPageContainer>
  );
}

export default MainPage;
