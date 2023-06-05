import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import Styles from '../config/globalFontStyle.module.css';

interface playList {
  tastePlaylistName: string;
  tastePlaylistDesc: string;
  publicOrPrivate: number;
  playlistDetail: number[];
  tastePlaylistId: number;
}
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
  banUserList: string[] | null;
}
interface StyledCardProps {
  restaurant: Restaurant;
  showIconBox?: boolean;
  width?: string;
  openModal?: () => void;
  setModalData?: (data: number) => void;
  updateLikedRestaurant?: () => void;
  icon?: React.ReactNode;
  bookmark?: { [key: string]: number };
  setBookmark?: (data: { [key: string]: number }) => void;
}

const Card = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ width }) => (width === '100%' ? '100%' : width)};
  height: 100%;
  background: #ffffff;
`;

const CardImage = styled.img`
  width: 100%;
  height: 220px;
`;

const CardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem;
  width: 100%;
  box-sizing: border-box;
`;

const LikeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  width: 100%;
`;

const InfoName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: transform 0.3s ease;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  :hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0.5rem 0.5rem 1.5rem rgba(255, 137, 35, 0.6);
  }
`;
const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  transition: transform 0.3s ease;
  :hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

function StyledCard(props: StyledCardProps) {
  const {
    restaurant,
    showIconBox,
    width,
    openModal,
    setModalData,
    icon,
    updateLikedRestaurant,
    bookmark,
    setBookmark,
  } = props;
  const [liked, setLiked] = useState<boolean>(false);
  const likefunction: React.MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('restaurantId', restaurant?.restaurantId.toString() as never);
    try {
      const response = await axios.post('/likes/like', formData).then((res) => {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const unlikefunction: React.MouseEventHandler<SVGElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('restaurantId', restaurant.restaurantId.toString() as never);
    try {
      const response = await axios.post('/likes/unlike', formData);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      if (updateLikedRestaurant) {
        updateLikedRestaurant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    if (openModal) {
      openModal();
      if (setModalData) {
        setModalData(restaurant.restaurantId);
      }
    }
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    if (restaurant?.likeUserList) {
      restaurant.likeUserList.forEach((user) => {
        if (user === sessionStorage.getItem('userId')) {
          setLiked(true);
        }
      });
    }
  }, []);
  const [likeCount, setLikeCount] = useState<number>(restaurant.likeUserList ? restaurant.likeUserList.length : 0);
  const [playlist, setPlaylist] = useState<playList[]>([]);
  return (
    <StyledLink to={`/detail/${restaurant.restaurantId}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card width={width}>
        {restaurant.imageUrl === null ? (
          <CardImage src="/logo.png" alt="" />
        ) : (
          <CardImage src={`https://nimatnemat.site${restaurant.imageUrl}`} alt="" />
        )}
        <CardInfoBox>
          {showIconBox && (
            <LikeBox>
              <span className={Styles.p2bold}>좋아요 {likeCount}</span>
              <IconBox>
                <Icon>
                  {liked ? (
                    <BsFillHeartFill size="2.4rem" color="#FF7B69" onClick={unlikefunction} />
                  ) : (
                    <BsHeart size="2.4rem" onClick={likefunction} />
                  )}
                </Icon>
                <Icon>
                  {bookmark && bookmark[restaurant.restaurantId.toString()] > 0 ? (
                    <BsBookmarkFill size="2.4rem" color="rgba(255, 137, 35, 0.8)" onClick={handleBookmarkClick} />
                  ) : (
                    <BsBookmark size="2.4rem" onClick={handleBookmarkClick} />
                  )}
                </Icon>
              </IconBox>
            </LikeBox>
          )}
          <InfoBox>
            <InfoName>
              <InfoHeader>
                <span className={Styles.p1bold}>{restaurant?.name}&nbsp;&nbsp;</span>
                {restaurant?.avgPreference !== 0 ? (
                  <span className={Styles.h4} style={{ color: 'rgba(255, 137, 35, 0.8)' }}>
                    {restaurant?.avgPreference.toFixed(1)}
                  </span>
                ) : null}
              </InfoHeader>
              {icon && <Icon>{icon}</Icon>}
            </InfoName>
            <span className={Styles.p2medium}>{restaurant?.cuisineType}</span>
            <span className={Styles.p2medium}>{restaurant.tags ? restaurant?.tags.slice(0, 3).join(' ') : ''}</span>
          </InfoBox>
        </CardInfoBox>
      </Card>
    </StyledLink>
  );
}

StyledCard.defaultProps = {
  showIconBox: true,
  width: '100%',
  openModal: () => null,
  setModalData: () => null,
  updateLikedRestaurant: () => null,
  icon: null,
  bookmark: new Map(),
  setBookmark: () => null,
};

export default StyledCard;
