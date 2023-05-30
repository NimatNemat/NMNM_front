import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  AiOutlineFrown,
  AiOutlineSmile,
  AiOutlineMeh,
  AiOutlineStar,
  AiFillStar,
  AiOutlineDelete,
} from 'react-icons/ai';
import axios from 'axios';
import Styles from '../config/globalFontStyle.module.css';
import StaylistSlider from './StaylistSlider';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
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
const Rowbox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const RowText = styled.div`
  display: flex;
  :hover {
    cursor: pointer;
  }
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
const ProfileImg = styled.img`
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  :hover {
    cursor: pointer;
  }
`;
const ReviewTextContainer = styled.p<{ isMoreView: boolean }>`
  display: inline-block;
  margin: 0;
  gap: 0.5rem;
  width: 100%;
  min-height: 3rem;
  height: ${({ isMoreView }) => (isMoreView ? '100%' : '3rem')};
  overflow-y: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  /* padding-top: 2.4rem; */
`;
const SliderContainer = styled.div`
  width: 100%;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const EvaluationPicker = styled.ul`
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  gap: 1rem;
  margin: 0;
`;
const Evaluation = styled.div`
  border: none;
  display: flex;
  align-items: center;
  color: rgba(255, 137, 35, 0.6);
  gap: 0.5rem;
  padding: 0;
  flex-direction: column;
  width: 6rem;
`;
const Line = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.3);
  height: 1px;
`;
interface Review {
  _id: {
    timestamp: number;
    date: string;
  };
  reviewId: number;
  restaurantId: number;
  userId: string;
  restaurantName: string;
  userNickName: string;
  reviewInfo: string;
  reviewScore: number;
  simpleEvaluation: number;
  reviewDate: string;
  reviewImage: string[];
  profileImage: string;
}

interface Props {
  review: Review;
}
function ReviewComponent(props: Props) {
  const { review } = props;
  const userId = sessionStorage.getItem('userId');
  const [isMoreView, setIsMoreView] = useState<boolean>(false);

  const toggleMoreView = () => {
    setIsMoreView(!isMoreView);
  };
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/mypage/${review.userId}`);
  };

  const handleDelete = async () => {
    const res = await axios.delete(`/reviews/deleteReview/${review.reviewId}`);
    if (res.status === 200) {
      alert('리뷰가 삭제되었습니다.');
      window.location.reload();
    }
  };

  return (
    <ReviewContainer>
      <Rowbox>
        <RowText onClick={() => navigate(`/detail/${review.restaurantId}`)} className={Styles.p2bold}>
          {review.restaurantName}
        </RowText>
        {userId === review.userId && (
          <AiOutlineDelete size="2.4rem" onClick={handleDelete} style={{ cursor: 'pointer' }} />
        )}
      </Rowbox>
      <ProfileContainer>
        <ProfileImg src={`https://nimatnemat.site${review.profileImage}`} alt="profile" onClick={handleProfileClick} />
        <Colbox className={Styles.p2bold}>
          <div>{review.userNickName}</div>
          <div>{review.reviewDate.split('T')[0]}</div>
          <div>
            {[...Array(review.reviewScore)].map(() => (
              <AiFillStar style={{ color: 'rgba(255, 137, 35,0.6)' }} />
            ))}
            {[...Array(5 - review.reviewScore)].map(() => (
              <AiOutlineStar style={{ color: 'rgba(255, 137, 35,0.6)' }} />
            ))}
          </div>
        </Colbox>
        <EvaluationPicker>
          <Evaluation>
            {review.simpleEvaluation === 1 && <AiOutlineSmile size="3rem" />}
            {review.simpleEvaluation === 1 && <div className={Styles.p2bold}>좋아요</div>}
            {review.simpleEvaluation === 2 && <AiOutlineMeh size="3rem" />}
            {review.simpleEvaluation === 2 && <div className={Styles.p2bold}>괜찮아요</div>}
            {review.simpleEvaluation === 3 && <AiOutlineFrown size="3rem" />}
            {review.simpleEvaluation === 3 && <div className={Styles.p2bold}>별로에요</div>}
          </Evaluation>
        </EvaluationPicker>
      </ProfileContainer>
      <Content className={Styles.p2medium}>
        <SliderContainer>
          <StaylistSlider num={1}>
            {review.reviewImage.map((image) => (
              <div style={{ width: '100%' }}>
                <img src={`https://nimatnemat.site${image}`} alt="sdf" />
              </div>
            ))}
          </StaylistSlider>
        </SliderContainer>
        <ReviewTextContainer className={Styles.p2regular} isMoreView={isMoreView}>
          {review.reviewInfo.split('\n').map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        </ReviewTextContainer>
      </Content>
      <Line />
      <BtnContainer>
        <button
          type="button"
          onClick={toggleMoreView}
          className={Styles.p3bold}
          style={{
            border: 'none',
            background: 'none',
            padding: '0',
            cursor: 'pointer',
            color: 'rgb(128, 128, 128)',
          }}
        >
          {isMoreView ? '접기' : '더보기'}
        </button>
      </BtnContainer>
    </ReviewContainer>
  );
}

export default ReviewComponent;
