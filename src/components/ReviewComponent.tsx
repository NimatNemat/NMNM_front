import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineFrown, AiOutlineSmile, AiOutlineMeh, AiOutlineStar, AiFillStar } from 'react-icons/ai';
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
  padding: 1.6rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
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
  :hover {
    cursor: pointer;
  }
`;
const ReviewTextContainer = styled.p<{ isMoreView: boolean }>`
  display: inline-block;
  margin: 0;
  gap: 0.5rem;
  width: 100%;
  height: ${({ isMoreView }) => (isMoreView ? '100%' : '5.6rem')};
  overflow-y: hidden;
  /* padding-top: 2.4rem; */
`;
const SliderContainer = styled.div`
  width: 100%;
`;
const BtnContainer = styled.div`
  width: 100%;
`;

const EvaluationPicker = styled.ul`
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  gap: 1rem;
  margin: 0;
`;
const StarDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Evaluation = styled.div`
  border: none;
  display: flex;
  align-items: center;
  color: rgba(255, 137, 35, 0.6);
  background-color: #fffdf5;
  gap: 0.5rem;
  padding: 0;
  flex-direction: column;
  width: 6rem;
`;

function ReviewComponent() {
  const data = {
    name: '김민수',
    userId: 'testtest1',
    profileImg: '/img.png',
    createdAt: '2021-04-15',
    rating: 3,
    content:
      '특이점 : 테이블 많아서 회전율 빠름. 주문 후 꽤 빨리 음식 나오는 편. 한국에서 김치나베가 가장 맛있는 곳.김치나베 : 매콤달콤칼칼한 맛. 맵칼 중독자라면 1번 먹고 계속 생각나서 재방문하게 됨. 본인은 돈까스 싫어하는데도 이 곳 김치나베는 한 달에 최소 한 번은 다시 먹으러 옴! 치즈가 고소하고 부드러워서 뭔진 모르겠지만 비싼 치즈구나 싶은 최고의 맛. 김치와 돈까스와 치즈의 양이 모두 넉넉해서 만족스러운 한끼 식사 할 수 있음. 재방문의사 : O, 이거 안 먹으면 손해🥹',
  };
  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/mypage/${data.userId}`);
  };

  return (
    <ReviewContainer>
      <ProfileContainer onClick={handleProfileClick}>
        <img src="/img.png" alt="profile" style={{ width: '4rem', height: '4rem', borderRadius: '50%' }} />
        <Colbox className={Styles.p2bold}>
          <div>{data.name}</div>
          <div>{data.createdAt}</div>
          <div>
            {[...Array(data.rating)].map((index, i) => (
              <AiFillStar style={{ color: 'rgba(255, 137, 35,0.6)' }} />
            ))}
            {[...Array(5 - data.rating)].map((index, i) => (
              <AiOutlineStar style={{ color: 'rgba(255, 137, 35,0.6)' }} />
            ))}
          </div>
        </Colbox>
        <EvaluationPicker>
          <li>
            <Evaluation>
              <AiOutlineFrown size="3rem" />
              <div className={Styles.p2bold}>별로에요</div>
            </Evaluation>
          </li>
        </EvaluationPicker>
      </ProfileContainer>
      <Content className={Styles.p2medium}>
        <SliderContainer>
          <StaylistSlider num={1}>
            <div style={{ width: '100%' }}>
              <img src="/img.png" alt="sdf" />
            </div>
            <div style={{ width: '100%' }}>
              <img src="/logo.png" alt="sdf" />
            </div>
            <div style={{ width: '100%' }}>
              <img src="/img.png" alt="sdf" />
            </div>
          </StaylistSlider>
        </SliderContainer>
        <ReviewTextContainer className={Styles.p2regular} isMoreView={isMoreView}>
          {data.content}
        </ReviewTextContainer>
      </Content>
      <BtnContainer>
        <StyledButton
          // color="white"
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
