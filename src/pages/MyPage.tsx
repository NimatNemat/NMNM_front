import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import StyledButton from '../components/StyledButton';
import Styles from '../config/globalFontStyle.module.css';
import StyledCard from '../components/StyledCard';
import ReviewComponent from '../components/ReviewComponent';
import StyledModal from '../components/StyledModal';
import FollowModal from '../components/FollowModal';
import DeleteModal from '../components/DeleteModal';
import MyReview from '../components/MyReivew';

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
  banUserList: string[];
  reviews: [];
}
interface User {
  _id: {
    timestamp: number;
    date: string;
  };
  birthdate: string;
  email: string;
  gender: number;
  groupName: number | null;
  nickName: string;
  password: string;
  profileImage: string | null;
  Id: string;
  infoMessage: string;
}

interface FollowUser {
  userId: string;
  nickName: string;
  profileImage: string | null;
}

const MypageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 2.4rem;
  // max-width: 1440px;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
  align-items: center;
  width: 100%;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const Infocontent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
`;

const Imgbox = styled.div`
  border-radius: 50%;
  border: 1px solid #dfdfdf;
  overflow: hidden;
  width: 14rem;
  height: 12rem;
  @media (max-width: 425px) {
    width: 20rem;
    height: 20rem;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  width: 100%;
  @media (max-width: 425px) {
    justify-content: center;
  }
`;
const Rowbtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }
`;

const Info = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 425px) {
    justify-content: center;
  }
`;
const Line = styled.div`
  width: 100%;
  background-color: rgba(128, 128, 128, 0.3);
  height: 1px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;
interface BtnProps {
  clicked?: boolean;
}
const Btn = styled.button<BtnProps>`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.clicked ? 'rgba(255, 137, 35, 0.6)' : 'black')};
  cursor: pointer;
  &:hover {
    color: rgba(255, 137, 35, 0.6);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  padding: 1.2rem;
`;
const PlusIcon = styled(AiFillPlusCircle)`
  color: #9b9b9b;
`;
const Btncontainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 20rem;
`;

interface playList {
  tastePlaylistName: string;
  tastePlaylistDesc: string;
  publicOrPrivate: number;
  playlistDetail: number[];
  tastePlaylistId: number;
}

function Mypage() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFollowModal, setShowFollowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleModalData = (data: number) => {
    setModalData(data);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);
  const [renderCnt, setRenderCnt] = useState<number>(12);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
  const [banRestaurants, setbanRestaurants] = useState<Restaurant[]>([]);
  const [User, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const userId = sessionStorage.getItem('userId');
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [followerCnt, setFollowerCnt] = useState<number>(0);
  const [followingCnt, setFollowingCnt] = useState<number>(0);
  const [followers, setFollowers] = useState<FollowUser[]>([]);
  const [followings, setFollowings] = useState<FollowUser[]>([]);
  const [followingClicked, setFollowingClicked] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  let likedCount = 0;
  let banCount = 0;
  const [playlist, setPlaylist] = useState<playList[]>([]);
  const totalLists = playlist.length; // 맛플리의 총 개수
  const totalLikes = likedRestaurants.length; // 좋아요한 식당의 총 개수
  const totalBan = banRestaurants.length;
  const [bookmark, setBookmark] = useState<{ [key: string]: number }>({});
  const fetchPlayList = async () => {
    try {
      const response = await axios.get(`tastePlaylist/getTastePlaylist?userId=${sessionStorage.getItem('userId')}`);
      setPlaylist(response.data);
      const tmp = new Map<string, number>(Object.entries(bookmark));

      response.data.forEach((playlist: playList) => {
        playlist.playlistDetail.forEach((restaurantId: number) => {
          const currentCount = tmp.get(restaurantId.toString()) || 0;
          tmp.set(restaurantId.toString(), currentCount + 1);
        });
      });
      setBookmark(Object.fromEntries(tmp));
    } catch (error) {
      console.error(error);
    }
  };

  const ClickReview = () => {
    setTab(0);
    setRenderCnt(12);
  };
  const ClickLike = () => {
    setTab(2);
    setRenderCnt(12);
  };
  const ClickList = () => {
    setTab(1);
    setRenderCnt(12);
  };
  const ClickBan = () => {
    setTab(3);
    setRenderCnt(12);
  };
  const fetchData = async () => {
    setIsLoaded(false);
    try {
      const response = await axios.get(`/restaurant/all`);
      setRestaurants(response.data);
      setIsLoaded(true);
      const liked = response.data.filter((restaurant: Restaurant) => {
        return id && restaurant.likeUserList && restaurant.likeUserList.includes(id);
      });
      const ban = response.data.filter((restaurant: Restaurant) => {
        return id && restaurant.banUserList && restaurant.banUserList.includes(id);
      });
      setLikedRestaurants(liked);
      setbanRestaurants(ban);
    } catch (error) {
      console.error('Error fetching data', error);
      setIsLoaded(false);
    }
    try {
      const response = await axios.get(`/users/userId?userId=${id}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchFollowData = async () => {
    try {
      if (id) {
        const responseFollowing = await axios.get(`/follows/getMyfollows?userId=${id}`);
        setFollowingCnt(responseFollowing.data.length);
        setFollowings(responseFollowing.data);

        const responseFollowers = await axios.get(`/follows/getMyfollowers?userId=${id}`);
        setFollowerCnt(responseFollowers.data.length);
        setFollowers(responseFollowers.data);
      }
    } catch (error) {
      console.error('getFollowers error', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    fetchData();
    fetchFollowData();
  }, [id, isFollowing]);

  const toggleIsFollowing = () => {
    follow();
    setIsFollowing(!isFollowing);
  };

  const follow = async () => {
    const token = sessionStorage.getItem('token');
    let response;
    const formData = new FormData();
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    try {
      if (id) {
        formData.append('targetId', id);
        if (isFollowing) {
          response = await axios.post(`/follows/unfollow`, formData);
        } else {
          response = await axios.post(`/follows/follow`, formData);
        }
      }
    } catch (error) {
      console.error('Follow Api error', error);
    }
  };
  const addrestaurantToPlayList = async (playlistId: number | any, restaurantId: number) => {
    const formData = new FormData();
    formData.append('playlistId', playlistId?.toString());
    formData.append('restaurantId', String(restaurantId));
    const response = await axios.post(`tastePlaylist/addDetail`, formData);
  };
  const removerestaurantToPlayList = async (playlistId: number | any, restaurantId: number) => {
    const formData = new FormData();
    formData.append('playlistId', playlistId?.toString());
    formData.append('restaurantId', String(restaurantId));
    const response = await axios.post(`tastePlaylist/deleteDetail`, formData);
  };

  const addPlayList = async (userId: string, playListName: string, playListDesc: string, lock: number) => {
    const formData = new FormData();
    formData.append('tastePlaylistName', playListName);
    formData.append('tastePlaylistDesc', playListDesc);
    formData.append('publicOrPrivate', String(lock));
    formData.append('userId', userId);
    const response = await axios.post(`tastePlaylist/addTastePlaylist`, formData);
  };
  const showFollowerList = () => {
    setFollowingClicked(false);
    setShowFollowModal(true);
  };

  const showFollowingList = () => {
    setFollowingClicked(true);
    setShowFollowModal(true);
  };
  let button;

  if (userId === id) {
    button = (
      <Btncontainer>
        <StyledButton
          padding="0.8rem"
          borderRadius="0.4rem"
          onClick={() => {
            window.location.href = `/modify/${id}`;
          }}
        >
          <div className={Styles.p2bold}>프로필 편집</div>
        </StyledButton>
        <StyledButton
          padding="0.8rem"
          borderRadius="0.4rem"
          onClick={() => {
            window.location.href = `/mydetail/${id}`;
          }}
        >
          <div className={Styles.p2bold}>내 정보</div>
        </StyledButton>
      </Btncontainer>
    );
  } else if (isFollowing) {
    button = (
      <Btncontainer>
        <StyledButton padding="0.8rem" borderRadius="0.4rem" onClick={toggleIsFollowing} color="rgba(128, 128, 128, 1)">
          <div className={Styles.p2bold}>팔로잉</div>
        </StyledButton>
      </Btncontainer>
    );
  } else {
    button = (
      <Btncontainer>
        <StyledButton padding="0.8rem" borderRadius="0.4rem" onClick={toggleIsFollowing}>
          <div className={Styles.p2bold}>팔로우</div>
        </StyledButton>
      </Btncontainer>
    );
  }

  let modal;
  if (showFollowModal) {
    if (followingClicked) {
      modal = (
        <FollowModal
          show={showFollowModal}
          modalRef={modalRef}
          userList={followings}
          isFollowing
          onClose={() => setShowFollowModal(false)}
          onFollowChange={fetchFollowData}
        />
      );
    } else {
      modal = (
        <FollowModal
          show={showFollowModal}
          modalRef={modalRef}
          userList={followers}
          isFollowing={false}
          onClose={() => setShowFollowModal(false)}
          onFollowChange={fetchFollowData}
        />
      );
    }
  } else {
    modal = null;
  }

  const handleIconClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    setShowDeleteModal(true);
  };

  return (
    <>
      <MypageContainer>
        <Container>
          <InfoContainer>
            <Imgbox>
              <Img
                src={User?.profileImage ? User.profileImage : 'https://cdn-icons-png.flaticon.com/512/1555/1555492.png'}
              />
            </Imgbox>
            <Infocontent>
              <Rowbtn>
                <div className={Styles.p1bold}>{id}</div>
                {button}
              </Rowbtn>
              <Row>
                <div className={Styles.p2bold}>작성한 리뷰 {totalReviews}</div>
                <Btn onClick={showFollowerList}>
                  <div className={Styles.p2bold}>팔로워 {followerCnt}</div>
                </Btn>
                <Btn onClick={showFollowingList}>
                  <div className={Styles.p2bold}>팔로잉 {followingCnt}</div>
                </Btn>
              </Row>
              <Row>
                <div className={Styles.p2bold}>{User?.nickName}</div>
              </Row>
              <Info>
                <div className={Styles.p2regular}>{User?.infoMessage}</div>
              </Info>
            </Infocontent>
          </InfoContainer>
          <Line />
          <Row>
            <Btn className={Styles.p1bold} onClick={ClickReview} clicked={tab === 0}>
              작성한 리뷰
            </Btn>
            <Btn className={Styles.p1bold} onClick={ClickList} clicked={tab === 1}>
              맛플리
            </Btn>
            <Btn className={Styles.p1bold} onClick={ClickLike} clicked={tab === 2}>
              좋아요한 식당
            </Btn>
            {id === userId ? (
              <Btn className={Styles.p1bold} onClick={ClickBan} clicked={tab === 3}>
                안볼래요 식당
              </Btn>
            ) : null}
          </Row>

          {isLoaded && tab === 0 ? <MyReview setTotalReviews={setTotalReviews} id={id || ''} /> : null}
          {isLoaded && tab === 1 ? (
            <GridContainer>
              <Card className={Styles.h3medium}>
                <CardContent onClick={openModal}>
                  <PlusIcon />
                  <div style={{ color: '#9B9B9B' }}>맛플리 추가하기</div>
                </CardContent>
              </Card>
              {playlist.map((playList: playList) => (
                <Card
                  key={playList.tastePlaylistId}
                  onClick={() => {
                    window.location.href = `/playlist/${playList.tastePlaylistId}`;
                  }}
                >
                  <CardContent>
                    <div className={Styles.h3medium}>{playList.tastePlaylistName}</div>
                  </CardContent>
                  <CardContent>
                    <div style={{ color: '#9B9B9B' }}>{playList.playlistDetail.length}개의 식당</div>
                  </CardContent>
                  <CardContent>
                    <div className={Styles.p2regular}>{playList.tastePlaylistDesc}</div>
                  </CardContent>
                </Card>
              ))}
            </GridContainer>
          ) : null}
          {isLoaded && tab === 2 ? (
            <GridContainer>
              {likedRestaurants.length === 0 ? <div className={Styles.p2bold}>좋아요한 식당이 없습니다.</div> : null}
              {(() => {
                return likedRestaurants.map((restaurant: Restaurant) => {
                  if (likedCount < renderCnt) {
                    likedCount += 1;
                    return (
                      <StyledCard
                        restaurant={restaurant}
                        setModalData={handleModalData}
                        openModal={openModal}
                        key={restaurant.restaurantId}
                        updateLikedRestaurant={() => {
                          const updatedLikedRestaurants = likedRestaurants.filter(
                            (likedRestaurant: Restaurant) => likedRestaurant.restaurantId !== restaurant.restaurantId
                          );
                          setLikedRestaurants(updatedLikedRestaurants);
                        }}
                        showIconBox={userId === id}
                      />
                    );
                  }
                  return null;
                });
              })()}
            </GridContainer>
          ) : null}

          {id === userId && isLoaded && tab === 3 ? (
            <GridContainer>
              {banRestaurants.length === 0 ? <div className={Styles.p2bold}>안볼래요 식당이 없습니다.</div> : null}
              {(() => {
                return banRestaurants.map((restaurant: Restaurant) => {
                  if (banCount < renderCnt) {
                    banCount += 1;
                    return (
                      <StyledCard
                        restaurant={restaurant}
                        setModalData={handleModalData}
                        openModal={openModal}
                        key={restaurant.restaurantId}
                        showIconBox={false}
                        icon={<FiMoreHorizontal size="2.4rem" onClick={handleIconClick} />}
                        updateLikedRestaurant={() => {
                          const updatedbanRestaurants = banRestaurants.filter(
                            (banRestaurant: Restaurant) => banRestaurant.restaurantId !== restaurant.restaurantId
                          );
                          setbanRestaurants(updatedbanRestaurants);
                        }}
                      />
                    );
                  }
                  return null;
                });
              })()}
            </GridContainer>
          ) : null}
          {(tab === 0 && renderCnt < totalReviews) ||
          (tab === 1 && renderCnt < totalLists) ||
          (tab === 2 && renderCnt < totalLikes) ||
          (tab === 3 && renderCnt < totalBan) ? (
            <StyledButton
              onClick={() => {
                setRenderCnt((prev) => prev + 12);
              }}
              fontsize="1.2rem"
              padding="0.5rem 0"
            >
              더보기
            </StyledButton>
          ) : null}
        </Container>
      </MypageContainer>
      {showModal ? (
        <StyledModal
          show={showModal}
          onClose={closeModal}
          modalData={modalData}
          modalRef={modalRef}
          addPlayList={addPlayList}
          addrestaurantToPlayList={addrestaurantToPlayList}
          removerestaurantToPlayList={removerestaurantToPlayList}
        />
      ) : null}
      {modal}
      {showDeleteModal ? (
        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => console.log('clicked')}
          modalRef={modalRef}
        />
      ) : null}
    </>
  );
}

export default Mypage;
