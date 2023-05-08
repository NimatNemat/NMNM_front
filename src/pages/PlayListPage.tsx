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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  interface Restaurant {
    _id: {
      timestamp: number;
      date: string;
    };
    restaurantId: number;
    name: string;
    cuisineType: string;
    avgPreference: number;
    address: string;
    roadAddress: string;
    number: string;
    businessHours: string;
    tags: string[][];
    imageFile: {
      timestamp: number;
      date: string;
    };
    menu: string[][];
    peculiarTaste: null;
    likeUserList: string[];
    imageUrl: string;
    xposition: number;
    yposition: number;
  }
  const restaurant: Restaurant = {
    _id: {
      timestamp: 1627665600,
      date: '2021-07-30T00:00:00.000Z',
    },
    restaurantId: 1,
    name: '맛집1',
    cuisineType: '한식',
    avgPreference: 4.5,
    address: '서울특별시 강남구 역삼동 123-45',
    roadAddress: '서울특별시 강남구 테헤란로 123-45',
    number: '02-123-4567',
    businessHours: '10:00 ~ 22:00',
    tags: [
      ['#태그1', '#태그2', '#태그3'],
      ['#태그4', '#태그5', '#태그6'],
    ],
    imageFile: {
      timestamp: 1627665600,
      date: '2021-07-30T00:00:00.000Z',
    },
    menu: [
      ['메뉴1', '메뉴2', '메뉴3'],
      ['메뉴4', '메뉴5', '메뉴6'],
    ],
    peculiarTaste: null,
    likeUserList: ['user1', 'user2', 'user3'],
    imageUrl: 'https://picsum.photos/200',
    xposition: 37.123456,
    yposition: 127.123456,
  };
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
          <StyledCard restaurant={restaurant} showIconBox={false} icon={<FiMoreHorizontal size="2.4rem" />} />
          <StyledCard restaurant={restaurant} showIconBox={false} icon={<FiMoreHorizontal size="2.4rem" />} />
          <StyledCard restaurant={restaurant} showIconBox={false} icon={<FiMoreHorizontal size="2.4rem" />} />
        </GridContainer>
      </Container>
    </PlayListPageContainer>
  );
}

export default PlayListPage;
