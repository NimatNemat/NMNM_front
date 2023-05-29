import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    width: 70%;
  }
  @media (min-width: 1024px) {
    width: 60%;
  }
  @media (min-width: 1440px) {
    width: 50%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4vh;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  box-shadow: 5rem 5rem 12rem 0rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
`;
const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw;
  gap: 1.5vh;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 1vh;
`;
const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

function PreferencePage() {
  const [selected, setSelected] = useState<number>(1);
  const onClick = () => {
    setSelected(1);
  };
  const onClick2 = () => {
    setSelected(2);
  };
  const onClick3 = () => {
    setSelected(3);
  };
  const onClick4 = () => {
    setSelected(4);
  };
  const onClick5 = () => {
    setSelected(5);
  };
  interface Restaurant {
    _id: {
      timestamp: number;
      date: string;
    };
    restaurantId: number;
    name: string;
    cuisineType: string;
    avgPreference: number;
    address: string;
    roadAddress: string;
    number: string;
    businessHours: string;
    tags: string[][];
    imageFile: {
      timestamp: number;
      date: string;
    };
    menu: string[][];
    peculiarTaste: null;
    likeUserList: string[];
    imageUrl: string;
    xposition: number;
    yposition: number;
    banUserList: string[];
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoaded(false);
    const response = await axios.get(`/recommended/groupChoice`);
    setRestaurants(response.data);
    console.log(response.data);
    setIsLoaded(true);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth <= 767) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    updateIsMobile();
    // 이벤트 리스너 추가
    window.addEventListener('resize', updateIsMobile);

    // 컴포넌트가 언마운트되면 리스너를 제거
    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  const showSelectedRestaurants = () => {
    const idx = (selected - 1) * 10;
    const selectedRestaurants: Restaurant[] = restaurants.slice(idx, idx + 9);
    return (
      <StaylistSlider num={1}>
        {selectedRestaurants.length > 0
          ? selectedRestaurants.map((restaurant: Restaurant) => (
              <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
            ))
          : null}
      </StaylistSlider>
    );
  };
  return (
    <PreferencePageContainer>
      <Container>
        <Title className={Styles.h3}>나에게 맞는 그룹을 선택해보세요!</Title>
        <SubTitle className={Styles.h4}>해당 그룹의 데이터를 바탕으로 음식점을 추천해 드립니다.</SubTitle>
        <Menu>
          <Choicebtn selected={selected === 1} onClick={onClick} isMobile={isMobile}>
            <SubTitle className={Styles.h3}>👅</SubTitle>
            <SubTitle className={Styles.h4}>미식가</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected === 2} onClick={onClick2} isMobile={isMobile}>
            <SubTitle className={Styles.h3}>🥬</SubTitle>
            <SubTitle className={Styles.h4}>웰빙</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected === 3} onClick={onClick3} isMobile={isMobile}>
            <SubTitle className={Styles.h3}>🥩</SubTitle>
            <SubTitle className={Styles.h4}>육식맨</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected === 4} onClick={onClick4} isMobile={isMobile}>
            <SubTitle className={Styles.h3}>💵</SubTitle>
            <SubTitle className={Styles.h4}>가성비</SubTitle>
          </Choicebtn>
          <Choicebtn selected={selected === 5} onClick={onClick5} isMobile={isMobile}>
            <SubTitle className={Styles.h3}>👶🏻</SubTitle>
            <SubTitle className={Styles.h4}>초딩입맛</SubTitle>
          </Choicebtn>
        </Menu>
        {isLoaded ? (
          <Section>
            <ContentSection>
              <Title>
                <Text className={Styles.h4}>이런 가게는 어때요?</Text>
              </Title>
              <Box>{showSelectedRestaurants()}</Box>
            </ContentSection>
          </Section>
        ) : null}

        <BtnContainer>
          <StyledButton
            onClick={() => {
              window.location.href = `/register/${selected}`;
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
