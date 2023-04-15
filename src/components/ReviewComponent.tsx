import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StaylistSlider from './StaylistSlider';
import StyledButton from './StyledButton';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  background: #ffffff;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  padding: 1vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
const Profileimg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Colbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;
const ReviewTextContainer = styled.p<{ isMoreView: boolean }>`
  display: inline-block;
  margin: 0;
  gap: 0.5rem;
  width: 100%;
  height: ${({ isMoreView }) => (isMoreView ? '100%' : '5.6rem')};
  overflow-y: hidden;
  padding-top: 2.4rem;
`;
const SliderContainer = styled.div`
  width: 100%;
`;
const BtnContainer = styled.div`
  width: 100%;
`;

function ReviewComponent() {
  const data = {
    name: '김민수',
    profileImg: '/img.png',
    createdAt: '2021-04-15',
    rating: 5,
    content:
      '모츠나베 진짜 맛있고 유린기 양도 상당했어요 모찌리도후도 두부같이 하는데 많은데 여기는 찐모찌리도후! 모츠나베 육수 계속 채워주는거 너무 감동... 가격도 리즈너블한편이였고, 특히 생맥이랑 하이볼 오지지널 맛있었어요.',
  };
  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  return (
    <ReviewContainer>
      <ProfileContainer>
        <Profileimg src="/img.png" alt="profile" />
        <Colbox className={Styles.p1bold}>
          <div>{data.name}</div>
          <div>{data.createdAt}</div>
          <div>
            {[...Array(data.rating)].map((index, i) => (
              <span key={index}>★</span>
            ))}
            {[...Array(5 - data.rating)].map((index, i) => (
              <span key={index}>☆</span>
            ))}
          </div>
        </Colbox>
      </ProfileContainer>
      <Content className={Styles.p1medium}>
        <SliderContainer>
          <StaylistSlider />
        </SliderContainer>
        <ReviewTextContainer className={Styles.p1medium} isMoreView={isMoreView}>
          {data.content}
        </ReviewTextContainer>
      </Content>
      <BtnContainer>
        <StyledButton
          color="white"
          onClick={() => {
            setIsMoreView(!isMoreView);
          }}
          fontsize="1.2rem"
          padding="0.5rem 0"
        >
          {isMoreView ? '접기' : '더보기'}
        </StyledButton>
      </BtnContainer>
    </ReviewContainer>
  );
}

export default ReviewComponent;
