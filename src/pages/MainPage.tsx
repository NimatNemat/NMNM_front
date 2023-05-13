import React, { useState, useEffect, useMemo, useRef } from 'react';
import Select, { ActionMeta, InputActionMeta, SingleValue, components } from 'react-select';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledTag from '../components/StyledTag';
import StyledCard from '../components/StyledCard';
import StyledModal from '../components/StyledModal';
import StyledInput from '../components/StyledInput';
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
  justify-content: flex-start;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  { value: 'all', label: '니맛내맛 전체 식당리스트' },
];

const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;

const OptionImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

const OptionTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SelectListStyle = {
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
    fontWeight: '700',
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

const SelectIdSearchStyle = {
  container: (provided: any) => ({
    ...provided,
    height: '3.5rem',
  }),
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#FFFDF5',
    border: '#0.1rem solid rgba(128, 128, 128, 0.3)',
    height: '3.5rem',
    width: '20rem',
    boxShadow: 'none',
    minHeight: '3.5rem',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0 1rem',
    margin: '0',
  }),
  input: (provided: any) => ({
    ...provided,
    margin: '0',
    padding: '0',
    fontSize: '1.4rem',
    fontWeight: '700',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '1.4rem',
    fontWeight: '700',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#FFFFFF' : 'rgba(128, 128, 128, 0.7)',
    backgroundColor: state.isFocused ? 'rgba(255, 137, 35, 0.6)' : '#FFFDF5',
    cursor: 'pointer',
    fontSize: '1.4rem',
    fontWeight: '700',
    lineHeight: '1.5',
    padding: '0.8rem 1rem',
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
    fontSize: '1.4rem',
    fontWeight: '700',
  }),
};

function MainPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number>(0);
  const [blur, setBlur] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('all');
  const [postsPerPage, setPostsPerPage] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('진정한 한국인의 추천리스트');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [searchUserID, setSearchUserID] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<User[]>([]);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [addedUsers, setAddedUsers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

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

  interface User {
    userId: string;
    profileImage: string;
    nickName: string;
  }

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoaded(false);
    try {
      let response;
      if (selected === 'all') {
        response = await axios.get(`/restaurant/all`);
      } else if (selected === 'reco1') {
        const userId = sessionStorage.getItem('userId');
        response = await axios.get(`/recommended/${userId}/first`);
        // setRestaurants(response.data);
      } else {
        response = await axios.get('/recommended/second');
        // setRestaurants(response.data);
        console.log(response.data);
      }
      setRestaurants(response.data);
      console.log(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching restaurant data', error);
      setIsLoaded(false);
    }

    try {
      const response = await axios.get(`/users/all`);
      const userId = sessionStorage.getItem('userId');
      const userList = response.data;
      setUsers(userList.filter((user: User) => user.userId !== userId));
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    fetchData();
  }, [selected]);

  // 사용자 아이디를 검색하는 로직 (함께먹기 부분)
  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const searchUser = (newValue: string, actionMeta: InputActionMeta) => {
    setSearchUserID(newValue);
    // 사용자 아이디 검색하는 로직
    let filtered = users;
    filtered = filtered.filter((user) => user.userId.includes(searchUserID));

    setSearchedUser(filtered);
  };

  const handleUserSelect = (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (newValue !== null) {
      addUserTag(newValue.value);
      setShowSearchInput(false);
    }
  };

  const addUserTag = (userId: string) => {
    // 사용자 아이디를 태그에 추가하는 로직
    setAddedUsers([...addedUsers, userId]);
  };

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  // 페이지네이션 각 페이지 별로 Post할 갯수 정해서 페이지 나누기
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (restaurants: Restaurant[]) => {
    let currentPosts: Restaurant[] = [];
    currentPosts = restaurants.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  // Modal 관련
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalData = (data: number) => {
    setModalData(data);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

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
  }, [selectedTags, searchName]);

  // 선택한 태그와 Restaurant의 QuisinType을 비교하여 필터링
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (selectedTags.length > 0) {
      filtered = filtered.filter((restaurant) => {
        if (!restaurant.cuisineType) {
          return false;
        }
        return selectedTags.some((tag) => restaurant.cuisineType.includes(tag));
      });
    }

    filtered = filtered.filter((restaurant) => restaurant.name.includes(searchName));

    return filtered;
  }, [restaurants, selectedTags, searchName]);

  useEffect(() => {
    setCurrentRestaurant(currentPosts(filteredRestaurants));
  }, [currentPage, filteredRestaurants]);

  // 추천 방식 1에 해당하는 레스토랑
  const showAllRestaurant = () => {
    return (
      <>
        <GridContainer>
          {isLoaded ? (
            currentRestaurant.map((restaurant) => (
              <StyledCard
                restaurant={restaurant}
                setModalData={handleModalData}
                openModal={openModal}
                key={restaurant.restaurantId}
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

  interface OptionType {
    label: string;
    value: string;
    profileImage: string;
    nickName: string;
  }
  const formatOptionLabel = ({ value, label, profileImage, nickName }: OptionType) => (
    <OptionDiv>
      <OptionImgDiv>
        <img src={profileImage} alt={label} style={{ width: '5rem', height: '5rem', borderRadius: '50%' }} />
      </OptionImgDiv>
      <OptionTextDiv>
        <span>{label}</span>
        <span>{nickName}</span>
      </OptionTextDiv>
    </OptionDiv>
  );

  return (
    <>
      <MainPageContainer className="MainPage">
        <Container>
          <ListContainer>
            <StyledInput
              value={searchName}
              type="text"
              placeholder="검색어를 입력하세요."
              style={{ width: '50%' }}
              onChange={handleSearchName}
              background="#FFFFFF"
              border="0.1rem solid rgba(128, 128, 128, 0.3)"
              borderRadius="5rem"
              padding="0.8rem 3.2rem"
              icon={<AiOutlineSearch />}
            />
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
                {addedUsers.map((userId) => (
                  <StyledTag key={userId} text={userId} />
                ))}
                {showSearchInput ? (
                  <Select
                    autoFocus
                    options={
                      inputValue
                        ? searchedUser.map((user) => ({
                            value: user.userId,
                            label: user.userId,
                            profileImage: user.profileImage,
                            nickName: user.nickName,
                          }))
                        : []
                    }
                    isSearchable
                    onInputChange={(input, action) => {
                      setInputValue(input);
                      searchUser(input, action);
                    }}
                    onChange={(value, action) => handleUserSelect(value, action)}
                    styles={SelectIdSearchStyle}
                    placeholder="아이디를 검색하세요"
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                      IndicatorsContainer: () => null,
                      NoOptionsMessage: () => null,
                    }}
                    maxMenuHeight={200}
                    formatOptionLabel={formatOptionLabel}
                  />
                ) : (
                  <StyledTag text="+" onClick={toggleSearchInput} />
                )}
              </TagListContainer>
            </TagContainer>
            <GridHeaderContainer>
              <Select
                isSearchable={false}
                styles={SelectListStyle}
                options={options}
                value={options.find((option) => option.value === selected)}
                onChange={(option: any) => {
                  setSelected(option.value);
                  setSelectedLabel(option.label);
                }}
              />
            </GridHeaderContainer>
            {selected === 'all' ? showAllRestaurant() : null}
          </ListContainer>
        </Container>
      </MainPageContainer>
      {showModal ? <StyledModal show={showModal} onClose={closeModal} data={modalData} modalRef={modalRef} /> : null}
    </>
  );
}

export default MainPage;
