import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
  AiOutlineFrown,
  AiOutlineSmile,
  AiOutlineMeh,
  AiOutlineStar,
  AiFillStar,
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineDelete,
} from 'react-icons/ai';
import axios from 'axios';
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
const Rowbox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
  height: 100%;
  max-height: ${({ isMoreView }) => (isMoreView ? '100%' : '4.8rem')};
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
  gap: 0.5rem;
  padding: 0;
  flex-direction: column;
  width: 6rem;
`;

interface Review {
  _id: {
    timestamp: number;
    date: string;
  };
  reviewId: number;
  restaurantId: number;
  userId: string;
  reviewInfo: string;
  reviewScore: number;
  simpleEvaluation: number;
  reviewDate: string;
  reviewImage: string[];
}
interface Props {
  review: Review;
}
function ReviewComponent(props: Props) {
  const { review } = props;
  const userId = sessionStorage.getItem('userId');
  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/mypage/${review.userId}`);
  };

  const handleDelete = async () => {
    alert(review.reviewId);
    const res = await axios.delete(`/reviews/deleteReview/${review.reviewId}`);
    if (res.status === 200) {
      alert('리뷰가 삭제되었습니다.');
      window.location.reload();
    }
  };

  return (
    <ReviewContainer>
      <Rowbox>
        <div className={Styles.p2bold}>가게이름</div>
        {userId === review.userId && (
          <AiOutlineDelete size="2.4rem" onClick={handleDelete} style={{ cursor: 'pointer' }} />
        )}
      </Rowbox>
      <ProfileContainer>
        <button
          type="button"
          onClick={handleProfileClick}
          style={{ width: '4rem', height: '4rem', cursor: 'pointer', border: 'none', background: 'none', padding: '0' }}
        >
          <img src="/img.png" alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </button>
        <Colbox className={Styles.p2bold}>
          <div>{review.userId}</div>
          <div>{review.reviewDate.split('T')[0]}</div>
          <div>
            {[...Array(review.reviewScore)].map((index, i) => (
              <AiFillStar style={{ color: 'rgba(255, 137, 35,0.6)' }} />
            ))}
            {[...Array(5 - review.reviewScore)].map((index, i) => (
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
            {review.reviewImage.map((image, index) => (
              <div style={{ width: '100%' }}>
                <img src={image} alt="sdf" />
              </div>
            ))}
          </StaylistSlider>
        </SliderContainer>
        <ReviewTextContainer className={Styles.p2regular} isMoreView={isMoreView}>
          {review.reviewInfo}
        </ReviewTextContainer>
      </Content>
      <BtnContainer>
        <StyledButton
          onClick={() => {
            setIsMoreView(!isMoreView);
          }}
          fontsize="1.2rem"
          padding="0.5rem"
        >
          {isMoreView ? '접기' : '더보기'}
        </StyledButton>
      </BtnContainer>
    </ReviewContainer>
  );
}

export default ReviewComponent;
