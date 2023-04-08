import React, { useState } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';
import StyledCard from '../components/CardItem';

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
    width: 70%;
  }
  @media (min-width: 1440px) {
    width: 70%;
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
  width: 80%;
  justify-content: center;
  gap: 2.4vw;
  background: white;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 3vw;
  overflow: scroll;
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
interface IChoicebtn {
  selected: boolean;
}

const Choicebtn = styled.button<IChoicebtn>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 10vh;
  border-radius: 30px;
  background: ${(props) => (props.selected ? 'rgba(255, 137, 35, 0.6)' : '#ffffff')};
  box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.1);
  border: none;
  &:hover {
    box-shadow: 0.5rem 0.5rem 1.2rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
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
    likes: '5',
    name: '가츠시',
    category: '일식',
    hashtag: '돈까스, 우동',
  };
  const [selected, setSelected] = useState(false);
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
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected2} onClick={onClick2}>
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected3} onClick={onClick3}>
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected4} onClick={onClick4}>
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected5} onClick={onClick5}>
            <Title className={Styles.h2}>🥩</Title>
            <SubTitle className={Styles.p1bold}>육식맨</SubTitle>
          </Choicebtn>
        </Menu>
        <Content>
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
          <StyledCard
            imgSrc={data.imgSrc}
            likes={data.likes}
            name={data.name}
            category={data.category}
            hashtag={data.hashtag}
            showIconBox={false}
          />
        </Content>
        <BtnContainer>
          <StyledButton
            onClick={() => {
              console.log('click');
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
