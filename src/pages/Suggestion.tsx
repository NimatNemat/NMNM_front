import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineFrown, AiOutlineSmile, AiOutlineMeh, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import ReviewImageUpload from '../components/ReviewImageUpload';
import StyledButton from '../components/StyledButton';

const ReviewPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4vh;
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (min-width: 500px) {
    width: 70%;
  }
  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  border: 0.1rem solid rgba(128, 128, 128, 0.3);
  gap: 1.6vh;
  box-sizing: border-box;
  padding: 1.6rem 2.4rem;
`;

const StarDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 15rem;
  background-color: #fffdf5;
  resize: none;
  padding: 0;
  border: none;
  font-size: 1.6rem;
  ::placeholder {
    font-size: 1.6rem;
    color: rgba(128, 128, 128, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const Btn = styled.div`
  display: flex;
  width: 25%;
`;

function Suggestion() {
  const [reviewTextValue, setReviewTextValue] = useState<string>(''); // 리뷰텍스트
  const [starClicked, setStarClicked] = useState<boolean[]>([false, false, false, false, false]);

  const { id } = useParams<{ id: string }>();

  const handleReviewTextChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTextValue(event.target.value);
  };

  const starArray = [0, 1, 2, 3, 4];
  const handleStarClick = (index: number) => {
    const clickStates = [...starClicked];
    for (let i = 0; i < 5; i += 1) {
      clickStates[i] = i <= index;
    }
    setStarClicked(clickStates);
  };

  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <ReviewPageContainer>
      <Container>
        <Header className={Styles.h3}>수정이 필요한 부분을 알려주세요.</Header>
        <Content>
          <ReviewTextArea
            value={reviewTextValue}
            onChange={handleReviewTextChangeEvent}
            placeholder="수정이 필요한 부분을 알려주세요."
          />
        </Content>
        <BtnContainer>
          <Btn>
            <StyledButton borderRadius="2rem" fontsize="1.6rem" onClick={handleCancelButtonClick}>
              취소
            </StyledButton>
          </Btn>
          <Btn>
            <StyledButton borderRadius="2rem" fontsize="1.6rem" onClick={handleCancelButtonClick}>
              완료
            </StyledButton>
          </Btn>
        </BtnContainer>
      </Container>
    </ReviewPageContainer>
  );
}

export default Suggestion;
