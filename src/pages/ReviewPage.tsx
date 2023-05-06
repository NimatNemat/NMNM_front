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
const EvaluationPicker = styled.ul`
  justify-content: flex-start;
  list-style-type: none;
  display: flex;
  padding: 0;
  gap: 1rem;
  margin: 0;
`;

const EvaluationButton = styled.button<{ selected: boolean }>`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  color: ${({ selected }) => (selected ? 'rgba(255, 137, 35, 0.6)' : 'rgba(128, 128, 128, 0.3)')};
  background-color: #fffdf5;
  gap: 0.5rem;
  padding: 0;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  column-gap: 1vh;
  row-gap: 2vh;
  width: 100%;
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

const MAX_UPLOAD_COMPONENTS = 3;

function ReviewPage() {
  const [selectedEvaluation, setSelectedEvaluation] = useState<string>('맛있다'); // 간단평가항목 선택
  const [reviewTextValue, setReviewTextValue] = useState<string>(''); // 리뷰텍스트
  const [starClicked, setStarClicked] = useState<boolean[]>([false, false, false, false, false]);
  const [uploadComponents, setUploadComponents] = useState<number[]>([0]);

  const { id } = useParams<{ id: string }>();
  const handleEvaluationClickEvent = (evaluation: string) => {
    setSelectedEvaluation(evaluation);
  };

  const handleReviewTextChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewTextValue(event.target.value);
  };

  // Date.now()를 이용하여 현재 시간의 밀리초 단위로 표현된 고유한 숫자 값을 키값으로 사용
  const handleImageUpload = () => {
    if (uploadComponents.length < MAX_UPLOAD_COMPONENTS) {
      setUploadComponents((prevState) => [...prevState, Date.now()]);
    }
  };
  const handleImageDelete = (uniqueKey: number) => {
    setUploadComponents((prevState) => prevState.filter((key) => key !== uniqueKey));
    if (uploadComponents.length === 1) {
      handleImageUpload();
    }
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
        <Header className={Styles.h3}>가츠시에 대한 솔직한 리뷰를 써주세요.</Header>
        <Content>
          <StarDiv>
            {starArray.map((el) =>
              starClicked[el] ? (
                <AiFillStar
                  key={el}
                  onClick={() => handleStarClick(el)}
                  size="3.6rem"
                  style={{ color: 'rgba(255, 137, 35, 0.6)' }}
                />
              ) : (
                <AiOutlineStar
                  key={el}
                  onClick={() => handleStarClick(el)}
                  size="3.6rem"
                  style={{ color: 'rgba(255, 137, 35, 0.6)' }}
                />
              )
            )}
          </StarDiv>
          <EvaluationPicker>
            <li>
              <EvaluationButton
                selected={selectedEvaluation === '맛있다'}
                onClick={() => handleEvaluationClickEvent('맛있다')}
              >
                <AiOutlineSmile size="4rem" />
                <span className={Styles.p1medium}>맛있다</span>
              </EvaluationButton>
            </li>
            <li>
              <EvaluationButton
                selected={selectedEvaluation === '괜찮아요'}
                onClick={() => handleEvaluationClickEvent('괜찮아요')}
              >
                <AiOutlineMeh size="4rem" />
                <span className={Styles.p1medium}>괜찮아요</span>
              </EvaluationButton>
            </li>
            <li>
              <EvaluationButton
                selected={selectedEvaluation === '별로에요'}
                onClick={() => handleEvaluationClickEvent('별로에요')}
              >
                <AiOutlineFrown size="4rem" />
                <div className={Styles.p1medium}>별로에요</div>
              </EvaluationButton>
            </li>
          </EvaluationPicker>
          <ReviewTextArea
            value={reviewTextValue}
            onChange={handleReviewTextChangeEvent}
            placeholder="주문하신 메뉴는 어떠셨나요? 식당의 분위기와 서비스도 궁금해요!"
          />
        </Content>
        <GridContainer>
          {uploadComponents.map((uniqueKey, index) => (
            <ReviewImageUpload
              key={uniqueKey}
              index={index + 1}
              onUpload={handleImageUpload}
              onDelete={() => handleImageDelete(uniqueKey)}
            />
          ))}
        </GridContainer>
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

export default ReviewPage;
