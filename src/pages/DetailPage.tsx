import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlineStop,
  AiOutlineBulb,
  AiOutlineClockCircle,
  AiOutlinePhone,
} from 'react-icons/ai';
import Map from '../components/Map';
import StyledInput from '../components/Input';
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
    width: 70%;
  }
  @media (min-width: 1440px) {
    width: 70%;
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
  gap: 0.5vw;
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
  height: 35vh;
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
function DetailPage() {
  const info = {
    restaurantId: 0,
    name: '가츠시 건대점',
    xPosition: '127.075735440582',
    yPosition: '37.5463365886719',
    cuisineType: '일식',
    avgPreference: 0,
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
  return (
    <DetailPageContainer>
      <Container>
        <Section>
          <StyledImg src={info.img} alt="logo" />
          <Content>
            <Rowcenterbox>
              <Text className={Styles.h2}>{info.name}</Text>
              <Text className={Styles.h2} style={{ color: '#808080' }}>
                {info.avgPreference}
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
                <b>주소 :</b>
                {info.address} / {info.roadAddress}
              </Text>
              <Text className={Styles.p1regular}>
                <AiOutlineClockCircle />
                <b>운영시간 :</b>
                {info.businessHours}
              </Text>
              <Text className={Styles.p1regular}>
                <AiOutlineBulb />
                <b>전화번호 :</b>
                {info.number}
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
                  <div style={{ display: 'flex', width: '25%', justifyContent: 'center' }}>
                    <Text className={Styles.p1regular}>{item.name}</Text>
                  </div>
                  <div style={{ width: '50%', backgroundColor: 'black', height: '1px' }} />
                  <div style={{ display: 'flex', width: '25%', justifyContent: 'center' }}>
                    <Text className={Styles.p1regular}>{item.price}</Text>
                  </div>
                </Menu>
              ))}
            </Box>
          </Content>
        </Section>
      </Container>
    </DetailPageContainer>
  );
}

export default DetailPage;
