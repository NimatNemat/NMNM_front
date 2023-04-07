import React from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledTag from '../components/Tag';
import StyledCard from '../components/CardItem';

const MainPageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  width: 120rem;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.8rem;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: 120rem;
`;

const icons = require.context('../assets/icons', true);

function MainPage() {
  return (
    <MainPageContainer className="MainPage">
      <TagContainer>
        <span className={Styles.h3}>종류</span>
        <TagListContainer>
          <StyledTag imgSrc={icons('./korea.png')} text="한식" />
          <StyledTag imgSrc={icons('./china.png')} text="중식" />
          <StyledTag imgSrc={icons('./japan.png')} text="일식" />
          <StyledTag imgSrc={icons('./us.png')} text="양식" />
        </TagListContainer>
        <span className={Styles.h3}>태그</span>
        <TagListContainer>
          <StyledTag imgSrc={icons('./korea.png')} text="한식" />
          <StyledTag imgSrc={icons('./china.png')} text="중식" />
          <StyledTag imgSrc={icons('./japan.png')} text="일식" />
          <StyledTag imgSrc={icons('./us.png')} text="양식" />
        </TagListContainer>
        <span className={Styles.h3}>함께먹기</span>
        <TagListContainer>
          <StyledTag imgSrc={icons('./korea.png')} text="한식" />
          <StyledTag text="+" />
          <StyledTag text="제로페이" />
        </TagListContainer>
      </TagContainer>
      <ListContainer>
        <StyledCard
          imgSrc=""
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
        />
        <StyledCard
          imgSrc=""
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          showIconBox={false}
        />
      </ListContainer>
    </MainPageContainer>
  );
}

export default MainPage;
