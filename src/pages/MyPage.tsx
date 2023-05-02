import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StyledButton from '../components/StyledButton';
import Styles from '../config/globalFontStyle.module.css';
import StyledCard from '../components/StyledCard';

interface Restaurant {
  restaurantId: number;
  name: string;
  cuisineType: string;
  tags: string[];
  imageUrl: string;
  likeCount: number;
}
const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 2rem;
  gap: 2vw;
  align-items: center;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const Infocontent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  align-items: flex-start;
`;

const Imgbox = styled.div`
  border-radius: 50%;
  border: 1px solid black;
  overflow: hidden;
  width: 12rem;
  height: 12rem;
  @media (max-width: 425px) {
    width: 20rem;
    height: 20rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.8rem;
  gap: 2rem;
`;
const Info = styled.div`
  padding: 0.8rem;
`;
const Line = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.3);
  height: 1px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;
interface BtnProps {
  clicked?: boolean;
}
const Btn = styled.button<BtnProps>`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.clicked ? 'rgba(255, 137, 35, 0.6)' : 'black')};
  cursor: pointer;
  &:hover {
    color: rgba(255, 137, 35, 0.6);
  }
`;

function Mypage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const ClickReview = () => {
    setTab(0);
  };
  const ClickLike = () => {
    setTab(1);
  };
  const ClickList = () => {
    setTab(2);
  };
  const fetchData = async () => {
    setIsLoaded(false);
    try {
      const response = await axios.get(`/restaurant/all`);
      setRestaurants(response.data);
      setIsLoaded(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MypageContainer>
      <Container>
        <InfoContainer>
          <Imgbox>
            <Img src="/logo.png" />
          </Imgbox>
          <Infocontent>
            <Row>
              <div className={Styles.p1bold}>s__smin0515</div>
              <div>
                <StyledButton
                  padding="0.8rem"
                  onClick={() => {
                    window.location.href = '/modify';
                  }}
                >
                  <div className={Styles.p2bold}>프로필 편집</div>
                </StyledButton>
              </div>
            </Row>
            <Row>
              <div className={Styles.p2bold}>작성한 리뷰 9</div>
              <div className={Styles.p2bold}>팔로워 10</div>
              <div className={Styles.p2bold}>팔로우 20</div>
            </Row>
            <Info>
              <div className={Styles.p2regular}>안녕하세요. 저는 손성민 입니다.</div>
            </Info>
          </Infocontent>
        </InfoContainer>
        <Line />
        <Row>
          <Btn className={Styles.p1bold} onClick={ClickReview} clicked={tab === 0}>
            작성한 리뷰
          </Btn>
          <Btn className={Styles.p1bold} onClick={ClickLike} clicked={tab === 1}>
            맛플리 🎶
          </Btn>
          <Btn className={Styles.p1bold} onClick={ClickList} clicked={tab === 2}>
            좋아요한 식당
          </Btn>
        </Row>
        <GridContainer>
          {isLoaded && tab === 0 ? <h1>작성한 리뷰</h1> : null}
          {isLoaded && tab === 1 ? <h1>맛플리</h1> : null}
          {isLoaded && tab === 2
            ? restaurants.map((restaurant: any) => (
                <StyledCard
                  key={restaurant.restaurantId}
                  imgSrc={`http://3.39.232.5:8080${restaurant.imageUrl}`}
                  likes={restaurant.likeCount}
                  name={restaurant.name}
                  category={restaurant.cuisineType}
                  hashtag={restaurant.tags ? restaurant.tags.slice(0, 3).join(' ') : ''}
                  id={restaurant.restaurantId}
                />
              ))
            : null}
        </GridContainer>
      </Container>
    </MypageContainer>
  );
}

export default Mypage;
