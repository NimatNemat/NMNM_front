import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewComponent from './ReviewComponent';
import Styles from '../config/globalFontStyle.module.css';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;

interface MyReviewProps {
  setTotalReviews: (value: number) => void;
  id: string;
}
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
interface ReviewArray {
  reveiw: Review;
}
const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;
function MyReview({ setTotalReviews, id }: MyReviewProps) {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  useEffect(() => {
    axios
      .get(`/reviews/user/${id}`)
      .then((res) => {
        setReviewList(res.data);
        setTotalReviews(res.data.length);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <GridContainer>
      {reviewList.length === 0 && <Text className={Styles.p2bold}>작성한 리뷰가 없습니다.</Text>}
      {reviewList.map((review) => (
        <ReviewComponent review={review} />
      ))}
    </GridContainer>
  );
}
export default MyReview;
