import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewComponent from './ReviewComponent';
import Styles from '../config/globalFontStyle.module.css';
import SpinnerComponent from './Spinner';

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
  rendercnt: number;
}
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
}
interface ReviewArray {
  reveiw: Review;
}
const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;
function MyReview({ setTotalReviews, id, rendercnt }: MyReviewProps) {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/reviews/user/${id}`)
      .then((res) => {
        const reviews = res.data.map((item: any) => item.review);
        setReviewList(reviews);
        setTotalReviews(reviews.length);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <GridContainer>
      {reviewList.length === 0 && <SpinnerComponent />}
      {reviewList.map(
        (review, index) => index < rendercnt && <ReviewComponent review={review} key={review.reviewId} />
      )}
    </GridContainer>
  );
}
export default MyReview;
