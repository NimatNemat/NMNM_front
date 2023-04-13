import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlineStop,
  AiOutlineBulb,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import Map from '../components/Map';
import StyledCard from '../components/StyledCard';
import Styles from '../config/globalFontStyle.module.css';

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
  justify-content: flex-start;
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
const Rowbox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5vw;
  padding: 0.5vh;
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
const Menutext = styled.div`
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
function DetailPage() {
  const info = {
    restaurantId: 0,
    name: '가츠시 건대점',
    xPosition: '127.075735440582',
    yPosition: '37.5463365886719',
    cuisineType: '일식',
    avgPreference: 4,
    address: '서울 광진구 화양동 498-1',
    roadAddress: '서울 광진구 광나루로 418',
    number: '02-444-2355',
    businessHours: '매일 11:00 ~ 21:30',
    tags: '#제로페이',
    img: '/img.png',
    menu: [
      {
        name: '안심 돈까스',
        price: 8500,
      },
      {
        name: '등심 돈까스',
        price: 8000,
      },
      {
        name: '생선까스',
        price: 8000,
      },
      {
        name: '생선까스',
        price: 8000,
      },
      {
        name: '모듬까스',
        price: 10000,
      },
      {
        name: '철판 돈까스',
        price: 9000,
      },
    ],
  };
  const data = {
    imgSrc: '/img.png',
    likes: '5',
    name: '가츠시',
    category: '일식',
    hashtag: '돈까스, 우동',
  };
  const [restaurant, setRestaurant] = useState([]);

  const fetchData = () => {
    axios.get(`http://3.39.232.5:8080/api/restaurant/all`).then(function (response) {
      setRestaurant(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <DetailPageContainer>
      <Container>
        <Section>
          <StyledImg src={info.img} alt="logo" />
          <Content>
            <Rowcenterbox>
              <Text className={Styles.h2}>{info.name}</Text>
              <Text className={Styles.h2} style={{ color: '#808080' }}>
                {info.avgPreference.toFixed(1)}
              </Text>
            </Rowcenterbox>
            <Rowcenterbox>
              <Text className={Styles.h5}>{info.tags}</Text>
            </Rowcenterbox>
            <Rowcenterbox>
              <Text className={Styles.h5}>
                <AiOutlineHeart />
                좋아요
              </Text>
              <Text className={Styles.h5}>
                <AiOutlineShareAlt />
                공유하기
              </Text>
              <Text className={Styles.h5}>
                <AiOutlineStar />
                평가하기
              </Text>
              <Text className={Styles.h5}>
                <AiOutlineStop />
                안볼래요
              </Text>
            </Rowcenterbox>
          </Content>
        </Section>
        <Section>
          <Content>
            <Title>
              <Text className={Styles.h4}>상세정보</Text>
              <Text>정보수정요청</Text>
            </Title>
            <Box>
              <Text className={Styles.p1regular}>
                <AiOutlineBulb />
                주소 : {info.address} / {info.roadAddress}
              </Text>

              <Text className={Styles.p1regular}>
                <AiOutlineClockCircle />
                운영시간 :{info.businessHours}
              </Text>
              <Text className={Styles.p1regular}>
                <AiOutlineBulb />
                전화번호 :{info.number}
              </Text>
            </Box>
          </Content>
        </Section>
        <Section>
          <Content>
            <Title>
              <Text className={Styles.h4}>지도</Text>
            </Title>
            <div style={{ width: '100%', height: '50vw' }}>
              <Map x={info.xPosition} y={info.yPosition} name={info.name} />
            </div>
          </Content>
        </Section>
        <Section>
          <Content>
            <Title>
              <Text className={Styles.h4}>메뉴</Text>
            </Title>
            <Box>
              {info.menu.map((item) => (
                <Menu>
                  <Menutext>
                    <Text className={Styles.p1regular}>{item.name}</Text>
                  </Menutext>
                  <div style={{ width: '50%', backgroundColor: 'black', height: '1px' }} />
                  <Menutext>
                    <Text className={Styles.p1regular}>{item.price}</Text>
                  </Menutext>
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
              <Rowbox>
                <Text className={Styles.p1regular}>평점</Text>
                <Text className={Styles.p1regular}>리뷰</Text>
              </Rowbox>
              <Rowbox>
                <Text className={Styles.p1regular}>평점</Text>
                <Text className={Styles.p1regular}>리뷰</Text>
              </Rowbox>
            </Box>
          </Content>
        </Section>
        <Section>
          <Content>
            <Title>
              <Text className={Styles.h4}>이런 가게는 어때요?</Text>
            </Title>
            <Box>
              <Flexbox>
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
              </Flexbox>
            </Box>
          </Content>
        </Section>
      </Container>
    </DetailPageContainer>
  );
}

export default DetailPage;
