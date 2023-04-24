import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledTag from '../components/StyledTag';
import StyledCard from '../components/StyledCard';
import StyledModal from '../components/StyledModal';
import Pagination from '../components/Pagination';

const MainPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  width: 100%;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  width: 100%;
  align-items: flex-start;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vh;
  width: 100%;
  @media (max-width: 470px) {
    justify-content: center;
    align-items: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;

const GridHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10vw;
`;

const NavItem = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? 'black' : 'white')};
  background: ${({ active }) => (active ? '#FFFDF5' : 'rgba(0, 0, 0, 0.6)')};
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const icons = require.context('../assets/icons', true);

function MainPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number>(0);
  const [blur, setBlur] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('reco1');
  const [postsPerPage, setPostsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant[]>([]);
  interface Restaurant {
    restaurantId: number;
    name: string;
    cuisineType: string;
    tags: [[string]];
    img: string;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoaded(false);
    try {
      const response = await axios.get(`http://3.39.232.5:8080/api/restaurant/all`);
      setRestaurants(response.data);
      setIsLoaded(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
      setIsLoaded(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (restaurants: Restaurant[]) => {
    let currentPosts: Restaurant[] = [];
    currentPosts = restaurants.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
  useEffect(() => {
    setCurrentRestaurant(currentPosts(restaurants));
  }, [currentPage, restaurants]);

  const handleModalData = (data: number) => {
    setModalData(data);
  };
  const openModal = () => {
    setShowModal(true);
    setBlur(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setBlur(false);
  };
  const blurStyle = {
    opacity: blur ? '0.5' : '1',
    PointerEvents: blur ? 'none' : 'auto',
  };
  const showFirstRecoBox = () => {
    return (
      <>
        <GridContainer>
          {isLoaded ? (
            currentRestaurant.map((restaurant) => (
              <StyledCard
                key={restaurant.restaurantId}
                imgSrc="/logo.png"
                likes="12개"
                name={restaurant.name}
                category={restaurant.cuisineType}
                hashtag={
                  restaurant.tags
                    ? restaurant.tags
                        .slice(0, 3)
                        .map((tagGroup) => tagGroup.join(' '))
                        .join(' ')
                    : ''
                }
                id={restaurant.restaurantId}
                setModalData={handleModalData}
                openModal={openModal}
              />
            ))
          ) : (
            <h1>로딩중입니다.</h1>
          )}
        </GridContainer>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={restaurants.length}
          paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
        />
      </>
    );
  };

  return (
    <>
      <MainPageContainer className="MainPage" style={blurStyle}>
        <Container>
          <ListContainer>
            <TagContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                종류
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag imgSrc={icons('./china.png')} text="중식" />
                <StyledTag imgSrc={icons('./japan.png')} text="일식" />
                <StyledTag imgSrc={icons('./us.png')} text="양식" />
              </TagListContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                태그
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag imgSrc={icons('./china.png')} text="중식" />
                <StyledTag imgSrc={icons('./japan.png')} text="일식" />
                <StyledTag imgSrc={icons('./us.png')} text="양식" />
              </TagListContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                함께먹기
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag text="+" />
              </TagListContainer>
            </TagContainer>
            <GridHeaderContainer>
              <Nav>
                <NavItem className={Styles.h3} active={selected === 'reco1'} onClick={() => setSelected('reco1')}>
                  진정한 한국인의 추천리스트
                </NavItem>
                <NavItem className={Styles.h3} active={selected === 'reco2'} onClick={() => setSelected('reco2')}>
                  당신만을 위한 추천리스트
                </NavItem>
              </Nav>
            </GridHeaderContainer>
            {selected === 'reco1' ? showFirstRecoBox() : null}
          </ListContainer>
        </Container>
      </MainPageContainer>
      {showModal ? <StyledModal show={showModal} onClose={closeModal} data={modalData} /> : null}
    </>
  );
}

export default MainPage;
