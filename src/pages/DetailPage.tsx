import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { AiOutlineShareAlt, AiOutlineStar, AiOutlineBulb, AiOutlineClockCircle, AiFillSignal } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { FiSlash } from 'react-icons/fi';
import Map from '../components/Map';
import StyledCard from '../components/StyledCard';
import Styles from '../config/globalFontStyle.module.css';
import ReviewComponent from '../components/ReviewComponent';
import StaylistSlider from '../components/StaylistSlider';
import StyledButton from '../components/StyledButton';

const DetailPageContainer = styled.div`
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
    width: 50%;
  }
  @media (min-width: 1440px) {
    width: 50%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.7vh;
`;
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  box-shadow: 5rem 5rem 12rem 0rem rgba(0, 0, 0, 0.1);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh 5vw;
  gap: 1vh;
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
const Rowcenterbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 25vh;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vh;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5vh;
`;
const MenuTitle = styled.div`
  display: flex;
  width: 25%;
`;
const Menuprice = styled.div`
  display: flex;
  width: 25%;
  justify-content: center;
`;
const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1vh;
  overflow: auto;
  padding: 1vh 0 2vh 0;
`;
const Icon = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  gap: 0.5vw;
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

function DetailPage() {
  const { id } = useParams<{ id: string }>();

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
  }
  const [restaurant, setRestaurant] = useState<Restaurant>({} as Restaurant);
  const [liked, setLiked] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoaded(false);
    const response = await axios.get(`/restaurant/${id}`);
    setRestaurant(response.data);
    if (response.data.likeUserList) {
      response.data.likeUserList.forEach((user: string) => {
        if (user === sessionStorage.getItem('userId')) {
          setLiked(true);
        }
      });
    }
    setIsLoaded(true);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState<number>(3);
  const likefunction: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('restaurantId', restaurant?.restaurantId.toString() as never);
    try {
      const response = await axios.post('/likes/like', formData).then((res) => {
        setLiked(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unlikefunction: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('restaurantId', restaurant.restaurantId.toString() as never);
    try {
      const response = await axios.post('/likes/unlike', formData);
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    fetchData();
  }, []);
  return (
    <DetailPageContainer>
      {isLoaded ? (
        <Container>
          <Section>
            {restaurant.imageUrl === null ? (
              <StyledImg src="/logo.png" alt="" />
            ) : (
              <StyledImg src={`http://3.39.232.5:8080${restaurant.imageUrl}`} alt="" />
            )}
            <Content>
              <Rowcenterbox>
                <Text className={Styles.h4}>{restaurant.cuisineType}</Text>
              </Rowcenterbox>
              <Rowcenterbox>
                <Text className={Styles.h2}>{restaurant.name}</Text>
                <Text className={Styles.h2} style={{ color: 'rgba(255, 137, 35, 0.8)' }}>
                  {restaurant.avgPreference.toFixed(1)}
                </Text>
              </Rowcenterbox>
              <Rowcenterbox style={{ gap: '5px' }}>
                {restaurant.tags?.map(
                  (tag, index) =>
                    index < 3 && (
                      <Text className={Styles.p2bold} key={tag.toString()}>
                        {tag}
                      </Text>
                    )
                )}
              </Rowcenterbox>
              <Rowcenterbox>
                <Text className={Styles.h4}>
                  {liked ? (
                    <Icon type="button" onClick={unlikefunction} className={Styles.h4}>
                      <BsFillHeartFill color="red" />
                      <div>좋아요</div>
                    </Icon>
                  ) : (
                    <Icon onClick={likefunction} className={Styles.h4}>
                      <BsHeart />
                      <div>좋아요</div>
                    </Icon>
                  )}
                </Text>
                <Icon className={Styles.h4}>
                  <AiOutlineShareAlt />
                  <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                    공유하기
                  </Link>
                </Icon>
                <Icon className={Styles.h4}>
                  <AiOutlineStar />
                  <Link to={`/review/${restaurant.restaurantId}`} style={{ textDecoration: 'none', color: 'black' }}>
                    평가하기
                  </Link>
                </Icon>
                <Icon className={Styles.h4}>
                  <FiSlash />
                  <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                    안볼래요
                  </Link>
                </Icon>
              </Rowcenterbox>
            </Content>
          </Section>
          <Section>
            <Content>
              <Title>
                <Text className={Styles.h4}>상세정보</Text>
                <Link
                  to={`/Suggestion/${id}`}
                  className={Styles.p2bold}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  정보수정요청
                </Link>
              </Title>
              <Box>
                <Text className={Styles.p1regular}>
                  <AiOutlineBulb />
                  주소 : {restaurant.address} / {restaurant.roadAddress}
                </Text>

                <Text className={Styles.p1regular}>
                  <AiOutlineClockCircle />
                  운영시간 : {restaurant.businessHours}
                </Text>
                <Text className={Styles.p1regular}>
                  <AiOutlineBulb />
                  전화번호 : {restaurant.number}
                </Text>
              </Box>
            </Content>
          </Section>
          <Section>
            <Content>
              <Title>
                <Text className={Styles.h4}>지도</Text>
              </Title>
              <div style={{ width: '100%', height: '300px' }}>
                <Map x={restaurant.xposition} y={restaurant.yposition} name={restaurant.name} />
              </div>
            </Content>
          </Section>
          <Section>
            <Content>
              <Title>
                <Text className={Styles.h4}>메뉴</Text>
              </Title>
              <Box>
                {restaurant.menu.map((item) => (
                  <Menu>
                    <MenuTitle>
                      <Text className={Styles.p2bold}>{item[0]}</Text>
                    </MenuTitle>

                    <div style={{ width: '30%', backgroundColor: 'black', height: '1px' }} />
                    <Menuprice>
                      <Text className={Styles.p2bold}>{item[1]}</Text>
                    </Menuprice>
                  </Menu>
                ))}
              </Box>
            </Content>
          </Section>
          <Section>
            <Content>
              <Title>
                <Text className={Styles.h4}>리뷰</Text>
              </Title>
              <Box>
                {[...Array(review)].map((index, i) => (
                  <ReviewComponent />
                ))}
              </Box>
            </Content>
            <StyledButton
              onClick={() => {
                setReview((prev) => prev + 3);
              }}
              fontsize="1.2rem"
              padding="0.5rem 0"
            >
              더보기
            </StyledButton>
          </Section>
          <Section>
            <Content>
              <Title>
                <Text className={Styles.h4}>이런 가게는 어때요?</Text>
              </Title>
              <Box>
                <StaylistSlider num={1}>
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                  <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                </StaylistSlider>
              </Box>
            </Content>
          </Section>
        </Container>
      ) : (
        <h1>로딩중입니다.</h1>
      )}
    </DetailPageContainer>
  );
}

export default DetailPage;
