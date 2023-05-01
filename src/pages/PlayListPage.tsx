import React from 'react';
import styled from 'styled-components';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import Styles from '../config/globalFontStyle.module.css';
import StyledCard from '../components/StyledCard';

const PlayListPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4vh;
  max-width: 1440px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 278px;
  background: #ffffff;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
`;

const PlusIcon = styled(AiFillPlusCircle)`
  color: #9b9b9b;
`;

function PlayListPage() {
  return (
    <PlayListPageContainer>
      <Container>
        <Header className={Styles.h3}>손성민님의 맛플리</Header>
        <GridContainer>
          <Card className={Styles.h3medium}>
            <CardContent>
              <PlusIcon />
              <div style={{ color: '#9B9B9B' }}>맛집 추가하기</div>
            </CardContent>
          </Card>
          <StyledCard imgSrc="" name="가츠시" showIconBox={false} id={2} icon={<FiMoreHorizontal size="2.4rem" />} />
          <StyledCard imgSrc="" name="가츠시" showIconBox={false} id={3} icon={<FiMoreHorizontal size="2.4rem" />} />
          <StyledCard imgSrc="" name="가츠시" showIconBox={false} id={4} icon={<FiMoreHorizontal size="2.4rem" />} />
        </GridContainer>
      </Container>
    </PlayListPageContainer>
  );
}

export default PlayListPage;
