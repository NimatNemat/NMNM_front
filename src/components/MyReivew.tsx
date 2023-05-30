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
  profileImage: string;
}

function MyReview({ setTotalReviews, id, rendercnt }: MyReviewProps) {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(false);
    axios
      .get(`/reviews/user/${id}`)
      .then((res) => {
        const reviews = res.data.map((item: any) => item.review);
        setReviewList(reviews);
        setTotalReviews(reviews.length);
        setLoaded(true);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  let content;

  if (loaded === false) {
    content = <SpinnerComponent />;
  } else if (reviewList.length === 0) {
    content = null;
  } else {
    content = reviewList.map(
      (review, index) => index < rendercnt && <ReviewComponent review={review} key={review.reviewId} />
    );
  }

  return <GridContainer>{content}</GridContainer>;
}
export default MyReview;
