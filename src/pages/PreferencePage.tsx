import React, { useState } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';
import StyledCard from '../components/StyledCard';
import Choicebtn from '../components/ChoiceBtn';
import StaylistSlider from '../components/StaylistSlider';

const PreferencePageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 80%;
  }
  @media (min-width: 1440px) {
    width: 80%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4vh;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  width: 80%;
  padding: 4vw;
  background-color: rgba(255, 137, 35, 0.1);
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin: 3vw 24rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: block;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 30px;
    width: 20vw;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  &::-webkit-scrollbar-track {
    border-radius: 30px;
  }
  &::-webkit-scrollbar-button:horizontal:start:decrement {
    width: 2vw;
    height: 0;
  }
  &::-webkit-scrollbar-button:horizontal:end:increment {
    width: 2vw;
    height: 0;
  }
`;

const Title = styled.div`
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(128, 128, 128, 1);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36rem;
  height: 6rem;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1fr;
  justify-content: center;
  align-items: center;
  gap: 2.4vh;
`;

function PreferencePage() {
  const data = {
    imgSrc: '/img.png',
    likes: 5,
    name: '가츠시',
    category: '일식',
    hashtag: ['돈까스', '우동'],
    id: 1,
  };
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(false);
  const [selected5, setSelected5] = useState(false);

  const onClick = () => {
    setSelected(true);
    setSelected2(false);
    setSelected3(false);
    setSelected4(false);
    setSelected5(false);
  };
  const onClick2 = () => {
    setSelected(false);
    setSelected2(true);
    setSelected3(false);
    setSelected4(false);
    setSelected5(false);
  };
  const onClick3 = () => {
    setSelected(false);
    setSelected2(false);
    setSelected3(true);
    setSelected4(false);
    setSelected5(false);
  };
  const onClick4 = () => {
    setSelected(false);
    setSelected2(false);
    setSelected3(false);
    setSelected4(true);
    setSelected5(false);
  };
  const onClick5 = () => {
    setSelected(false);
    setSelected2(false);
    setSelected3(false);
    setSelected4(false);
    setSelected5(true);
  };
  return (
    <PreferencePageContainer>
      <Container>
        <Title className={Styles.h3}>나에게 맞는 그룹을 선택해보세요!</Title>
        <SubTitle className={Styles.h4}>해당 그룹의 데이터를 바탕으로 음식점을 추천해 드립니다.</SubTitle>
        <Menu>
          <Choicebtn selected={selected} onClick={onClick}>
            <Title className={Styles.h2}>👅</Title>
            <SubTitle className={Styles.p1bold}>미식가</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected2} onClick={onClick2}>
            <Title className={Styles.h2}>💵</Title>
            <SubTitle className={Styles.p1bold}>가성비</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected3} onClick={onClick3}>
            <Title className={Styles.h2}>🥬</Title>
            <SubTitle className={Styles.p1bold}>웰빙</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected4} onClick={onClick4}>
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected5} onClick={onClick5}>
            <Title className={Styles.h2}>👶🏻</Title>
            <SubTitle className={Styles.p1bold}>초딩입맛</SubTitle>
          </Choicebtn>
        </Menu>

        <Content>
          <StaylistSlider>
            <StyledCard
              imgSrc={data.imgSrc}
              likes={data.likes}
              name={data.name}
              category={data.category}
              hashtag={data.hashtag ? data.hashtag.slice(0, 3).join(' ') : ''}
              showIconBox={false}
              id={data.id}
            />
            <StyledCard
              imgSrc={data.imgSrc}
              likes={data.likes}
              name={data.name}
              category={data.category}
              hashtag={data.hashtag ? data.hashtag.slice(0, 3).join(' ') : ''}
              showIconBox={false}
              id={data.id}
            />
            <StyledCard
              imgSrc={data.imgSrc}
              likes={data.likes}
              name={data.name}
              category={data.category}
              hashtag={data.hashtag ? data.hashtag.slice(0, 3).join(' ') : ''}
              id={data.id}
              showIconBox={false}
            />
          </StaylistSlider>
        </Content>
        <BtnContainer>
          <StyledButton
            onClick={() => {
              window.location.href = '/register';
            }}
          >
            <div className={Styles.p1bold}>다음</div>
          </StyledButton>
        </BtnContainer>
      </Container>
    </PreferencePageContainer>
  );
}

export default PreferencePage;
