import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import Styles from '../config/globalFontStyle.module.css';
import StyledModal from './StyledModal';

interface StyledCardProps {
  imgSrc: string;
  likes: string;
  name: string;
  category: string;
  hashtag: string;
  showIconBox?: boolean;
  width?: string;
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
  object-fit: cover;
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

function StyledCard(props: StyledCardProps) {
  const { imgSrc, likes, name, category, hashtag, showIconBox, width } = props;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLikeClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    setLiked(!liked);
  };
  const handleBookmarkClick: React.MouseEventHandler<SVGElement> = (event) => {
    event.preventDefault();
    setBookmarked(!bookmarked);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Link to="/detail/" style={{ textDecoration: 'none', color: 'black' }}>
        <Card width={width}>
          <CardImage src={imgSrc} alt="" />
          <CardInfoBox>
            {showIconBox && (
              <LikeBox>
                <span className={Styles.p2bold}>좋아요 {likes}</span>
                <IconBox>
                  {liked ? (
                    <BsFillHeartFill size="2.4rem" color="red" onClick={handleLikeClick} />
                  ) : (
                    <BsHeart size="2.4rem" onClick={handleLikeClick} />
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
              <span className={Styles.p1bold}>{name}</span>
              <span className={Styles.p2medium}>{category}</span>
              <span className={Styles.p2medium}>{hashtag}</span>
            </InfoBox>
          </CardInfoBox>
        </Card>
      </Link>
      <StyledModal show={showModal} onClose={closeModal} />
    </>
  );
}

StyledCard.defaultProps = {
  showIconBox: true,
  width: '100%',
};

export default StyledCard;
