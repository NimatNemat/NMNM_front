import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import Styles from '../config/globalFontStyle.module.css';

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
interface StyledCardProps {
  restaurant: Restaurant;
  showIconBox?: boolean;
  width?: string;
  openModal?: () => void;
  setModalData?: (data: number) => void;
  icon?: React.ReactNode;
}

const Card = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ width }) => (width === '100%' ? '100%' : width)};
  height: 100%;
  background: #ffffff;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

function StyledCard(props: StyledCardProps) {
  const { restaurant, showIconBox, width, openModal, setModalData, icon } = props;
  const [bookmarked, setBookmarked] = useState(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookmarkClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    setBookmarked(!bookmarked);
    if (openModal) {
      openModal();
      if (setModalData) {
        setModalData(1);
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

  return (
    <Link to={`/detail/${restaurant.restaurantId}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card width={width}>
        {restaurant.imageUrl === null ? (
          <CardImage src="/logo.png" alt="" />
        ) : (
          <CardImage src={`http://3.39.232.5:8080${restaurant.imageUrl}`} alt="" />
        )}
        <CardInfoBox>
          {showIconBox && (
            <LikeBox>
              <span className={Styles.p2bold}>좋아요 {likeCount}</span>
              <IconBox>
                {liked ? (
                  <BsFillHeartFill size="2.4rem" color="red" onClick={unlikefunction} />
                ) : (
                  <BsHeart size="2.4rem" onClick={likefunction} />
                )}
                {bookmarked ? (
                  <BsBookmarkFill size="2.4rem" color="#FF7B69" onClick={handleBookmarkClick} />
                ) : (
                  <BsBookmark size="2.4rem" onClick={handleBookmarkClick} />
                )}
              </IconBox>
            </LikeBox>
          )}
          <InfoBox>
            <InfoName>
              <span className={Styles.p1bold}>{restaurant?.name}</span>
              {icon && <div>{icon}</div>}
            </InfoName>
            <span className={Styles.p2medium}>{restaurant?.cuisineType}</span>
            <span className={Styles.p2medium}>
              {restaurant.tags
                ? restaurant?.tags
                    .slice(0, 3)
                    .map((tagGroup) => tagGroup.join(' '))
                    .join(' ')
                : ''}
            </span>
          </InfoBox>
        </CardInfoBox>
      </Card>
    </Link>
  );
}

StyledCard.defaultProps = {
  showIconBox: true,
  width: '100%',
  openModal: () => null,
  setModalData: () => null,
  icon: null,
  // restaurant: {
  //   _id: {
  //     timestamp: 1627665600,
  //     date: '2021-07-30T00:00:00.000Z',
  //   },
  //   restaurantId: 1,
  //   name: '맛집1',
  //   cuisineType: '한식',
  //   avgPreference: 4.5,
  //   address: '서울특별시 강남구 역삼동 123-45',
  //   roadAddress: '서울특별시 강남구 테헤란로 427',
  //   number: '02-123-4567',
  //   businessHours: '10:00 ~ 22:00',
  //   tags: [
  //     ['#태그1', '#태그2', '#태그3'],
  //     ['#태그4', '#태그5', '#태그6'],
  //   ],
  //   imageFile: {
  //     timestamp: 1627665600,
  //     date: '2021-07-30T00:00:00.000Z',
  //   },
  //   menu: [
  //     ['메뉴1', '메뉴2', '메뉴3'],
  //     ['메뉴4', '메뉴5', '메뉴6'],
  //   ],
  //   peculiarTaste: null,
  //   likeUserList: ['user1', 'user2', 'user3'],
  //   imageUrl: '',
  //   xposition: 37.498095,
  //   yposition: 127.02861,
  // },
};

export default StyledCard;
