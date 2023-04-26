import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
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
  max-width: 1440px;
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
  @media (max-width: 566px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
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

const icons = require.context('../assets/icons', true);

const options = [
  { value: 'reco1', label: '진정한 한국인의 추천리스트' },
  { value: 'reco2', label: '당신만을 위한 추천리스트' },
];

const customStyles = {
  container: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#FFFDF5',
    border: '#0.1rem solid rgba(128, 128, 128, 0.3)',
    height: '3.8rem',
    boxShadow: 'none',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '3.8rem',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? 'rgba(255, 137, 35, 0.6)' : '#FFFDF5',
    cursor: 'pointer',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    lineHeight: '2',
    padding: '1rem 2rem',
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: '0',
  }),

  menu: (provided: any) => ({
    ...provided,
    boxShadow: 'none',
    borderRadius: '0.2rem',
    border: '0.1rem solid rgba(128, 128, 128, 0.3)',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#000000',
  }),
};

function MainPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number>(0);
  const [blur, setBlur] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('reco1');
  const [postsPerPage, setPostsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('진정한 한국인의 추천리스트');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  interface Restaurant {
    restaurantId: number;
    name: string;
    cuisineType: string;
    tags: string[];
    img: string;
    likeCount: number;
  }
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoaded(false);
    try {
      const response = await axios.get(`/restaurant/all`);
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

  // 페이지네이션 각 페이지 별로 Post할 갯수 정해서 페이지 나누기
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (restaurants: Restaurant[]) => {
    let currentPosts: Restaurant[] = [];
    currentPosts = restaurants.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  // Modal 관련
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

  // 태그 관련
  // 태그 선택 시 SelectedTags에 추가, 다시 클릭 시 삭제
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 태그 변경시마다 페이지를 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags]);

  // 선택한 태그와 Restaurant의 QuisinType을 비교하여 필터링
  const filteredRestaurants = useMemo(() => {
    if (!restaurants || selectedTags.length === 0) {
      return restaurants;
    }

    return restaurants.filter((restaurant) => {
      if (!restaurant.cuisineType) {
        return false;
      }

      return selectedTags.some((tag) => restaurant.cuisineType.includes(tag));
    });
  }, [restaurants, selectedTags]);

  useEffect(() => {
    setCurrentRestaurant(currentPosts(filteredRestaurants));
  }, [currentPage, filteredRestaurants]);

  // 추천 방식 1에 해당하는 레스토랑
  const showFirstRecoBox = () => {
    return (
      <>
        <GridContainer>
          {isLoaded ? (
            currentRestaurant.map((restaurant) => (
              <StyledCard
                key={restaurant.restaurantId}
                imgSrc="/logo.png"
                likes={restaurant.likeCount}
                name={restaurant.name}
                category={restaurant.cuisineType}
                hashtag={restaurant.tags ? restaurant.tags.slice(0, 3).join(' ') : ''}
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
          totalPosts={filteredRestaurants.length}
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
                <StyledTag imgSrc={icons('./korea.png')} text="한식" onClick={() => toggleTag('한식')} />
                <StyledTag imgSrc={icons('./china.png')} text="중식" onClick={() => toggleTag('중식')} />
                <StyledTag imgSrc={icons('./japan.png')} text="일식" onClick={() => toggleTag('일식')} />
                <StyledTag imgSrc={icons('./us.png')} text="양식" onClick={() => toggleTag('양식')} />
                <StyledTag imgSrc="" text="분식" onClick={() => toggleTag('분식')} />
                <StyledTag imgSrc="" text="아시아음식" onClick={() => toggleTag('아시아음식')} />
                <StyledTag imgSrc="" text="치킨" onClick={() => toggleTag('치킨')} />
                <StyledTag imgSrc="" text="피자" onClick={() => toggleTag('피자')} />
                <StyledTag imgSrc="" text="퓨전요리" onClick={() => toggleTag('퓨전요리')} />
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
              <Select
                isSearchable={false}
                styles={customStyles}
                options={options}
                value={options.find((option) => option.value === selected)}
                onChange={(option: any) => {
                  setSelected(option.value);
                  setSelectedLabel(option.label);
                }}
              />
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
