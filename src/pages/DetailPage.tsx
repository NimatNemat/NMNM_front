import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import {
  AiOutlineShareAlt,
  AiOutlineStar,
  AiOutlineBulb,
  AiOutlineClockCircle,
  AiOutlineUnlock,
  AiOutlineLock,
} from 'react-icons/ai';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import Map from '../components/Map';
import StyledCard from '../components/StyledCard';
import Styles from '../config/globalFontStyle.module.css';
import ReviewComponent from '../components/ReviewComponent';
import StaylistSlider from '../components/StaylistSlider';
import StyledButton from '../components/StyledButton';
import ShareComponent from '../components/ShareComponent';
import Modal from '../components/Modal';
import SpinnerComponent from '../components/Spinner';

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
  box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.1);
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
const RowMenubox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 450px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
`;
const Titlebox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
  @media (max-width: 450px) {
    flex-direction: column;
  }
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

const Icon = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.3s ease;
  gap: 0.5vw;
  border: none;
  background-color: white;
  justify-content: center;
  color: black;
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
    reviews: [];
    banUserList: string[];
  }

  const [restaurant, setRestaurant] = useState<Restaurant>({} as Restaurant);
  const [liked, setLiked] = useState<boolean>(false);
  const [ban, setBan] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fetchRestaurants = async () => {
    setLoading2(false);
    try {
      const response = await axios.get(`/recommended/groupChoice`);
      setRestaurants(response.data.sort(() => Math.random() - 0.5));
      setLoading2(true);
    } catch (e) {
      setError(true);
      setLoading2(true);
    }
  };

  const fetchData = async () => {
    setIsLoaded(false);
    const response = await axios.get(`/restaurant/${id}`);
    setRestaurant(response.data);
    setReview(response.data.reviews.length);

    if (response.data.likeUserList) {
      response.data.likeUserList.forEach((user: string) => {
        if (user === sessionStorage.getItem('userId')) {
          setLiked(true);
        }
      });
    }
    if (response.data.banUserList) {
      response.data.banUserList.forEach((user: string) => {
        if (user === sessionStorage.getItem('userId')) {
          setBan(true);
        }
      });
    }
    setIsLoaded(true);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [review, setReview] = useState<number>(0);
  const likefunction: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (sessionStorage.getItem('userId') === null) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }
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
    if (sessionStorage.getItem('userId') === null) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }
    const formData = new FormData();
    formData.append('restaurantId', restaurant.restaurantId.toString() as never);
    try {
      const response = await axios.post('/likes/unlike', formData);
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  };
  const banfunction: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (sessionStorage.getItem('userId') === null) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }
    const formData = new FormData();
    formData.append('restaurantId', restaurant?.restaurantId.toString() as never);
    formData.append('userId', sessionStorage.getItem('userId') as never);
    try {
      const response = await axios.post('/likes/ban', formData);
      window.location.href = '/main';
    } catch (error) {
      console.log(error);
    }
  };
  const unbanfunction: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    if (sessionStorage.getItem('userId') === null) {
      alert('로그인이 필요합니다.');
      return;
    }
    const formData = new FormData();
    formData.append('restaurantId', restaurant?.restaurantId.toString() as never);
    formData.append('userId', sessionStorage.getItem('userId') as never);
    try {
      const response = await axios.post('/likes/unban', formData);
      window.location.href = '/main';
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
    fetchRestaurants();
  }, []);
  const [showModal, setShowModal] = useState<boolean>(false);

  const loadingfunction = () => {
    if (error) {
      return <Text>서버오류</Text>;
    }
    return <SpinnerComponent />;
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const shareUrl = `https://nimatnemat.github.io/detail/${id}`;
  const title = '맛집 공유';
  return (
    <>
      <DetailPageContainer>
        {isLoaded ? (
          <Container>
            <Section>
              {restaurant.imageUrl === null ? (
                <StyledImg src="/logo.png" alt="" />
              ) : (
                <StyledImg src={`https://nimatnemat.site${restaurant.imageUrl}`} alt="" />
              )}
              <Content>
                <Rowcenterbox>
                  <Text className={Styles.h4}>{restaurant.cuisineType}</Text>
                </Rowcenterbox>
                <Titlebox>
                  <Text className={Styles.h2}>{restaurant.name}</Text>
                  <Text className={Styles.h2} style={{ color: 'rgba(255, 137, 35, 0.8)' }}>
                    {restaurant.avgPreference.toFixed(1)}
                  </Text>
                </Titlebox>
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
                <RowMenubox>
                  {liked ? (
                    <Icon onClick={unlikefunction} className={Styles.h4}>
                      <BsFillHeartFill color="red" />
                      좋아요
                    </Icon>
                  ) : (
                    <Icon onClick={likefunction} className={Styles.h4}>
                      <BsHeart color="black" />
                      좋아요
                    </Icon>
                  )}

                  <Icon
                    className={Styles.h4}
                    onClick={(event) => {
                      event.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    <AiOutlineShareAlt color="black" />
                    공유하기
                  </Icon>
                  <Icon className={Styles.h4}>
                    <AiOutlineStar color="black" />
                    <Link to={`/review/${restaurant.restaurantId}`} style={{ textDecoration: 'none', color: 'black' }}>
                      평가하기
                    </Link>
                  </Icon>

                  {ban ? (
                    <Icon type="button" onClick={unbanfunction} className={Styles.h4}>
                      <AiOutlineUnlock color="black" />
                      <div color="black">볼래요</div>
                    </Icon>
                  ) : (
                    <Icon type="button" onClick={banfunction} className={Styles.h4}>
                      <AiOutlineLock color="black" />
                      <div color="black">안볼래요</div>
                    </Icon>
                  )}
                </RowMenubox>
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
                  {restaurant.menu ? null : <Text className={Styles.p2bold}>등록된 메뉴가 없습니다!</Text>}
                  {restaurant.menu?.map((item) => (
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
                  {restaurant.reviews.length === 0 ? (
                    <Text className={Styles.p2bold}>리뷰가 없습니다.</Text>
                  ) : (
                    restaurant.reviews
                      .map((item: any) => item.review)
                      .map((Review, index) => {
                        if (index < review) {
                          return <ReviewComponent review={Review} />;
                        }
                        return null;
                      })
                  )}
                </Box>
              </Content>
              {review < restaurant.reviews.length && (
                <StyledButton
                  onClick={() => {
                    if (review <= restaurant.reviews.length) {
                      setReview((prev) => prev + 3);
                    }
                  }}
                  fontsize="1.2rem"
                  padding="0.5rem 0"
                >
                  더보기
                </StyledButton>
              )}
            </Section>
            <Section>
              {loading2 && !error ? (
                <Content>
                  <Title>
                    <Text className={Styles.h4}>이런 가게는 어때요?</Text>
                  </Title>
                  <Box>
                    <StaylistSlider num={1}>
                      {restaurants?.map(
                        (restaurant, index) =>
                          index < 8 && <StyledCard restaurant={restaurant} showIconBox={false} width="100%" />
                      )}
                    </StaylistSlider>
                  </Box>
                </Content>
              ) : (
                loadingfunction()
              )}
            </Section>
          </Container>
        ) : (
          <h1>로딩중입니다.</h1>
        )}
      </DetailPageContainer>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          show={showModal}
          modalRef={modalRef}
          share={false}
        >
          <ShareComponent shareUrl={shareUrl} title={title} />
        </Modal>
      )}
    </>
  );
}

export default DetailPage;
