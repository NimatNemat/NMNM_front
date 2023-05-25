import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { BsBookmark, BsBookmarkFill, BsFillHeartFill, BsHeart } from 'react-icons/bs';
import { BiLock, BiLockOpen } from 'react-icons/bi';
import Styles from '../config/globalFontStyle.module.css';

interface playList {
  tastePlaylistName: string;
  tastePlaylistDesc: string;
  publicOrPrivate: number;
  playlistDetail: number[];
  tastePlaylistId: number;
}

interface PlaylistProps {
  width?: string;
  openModal?: () => void;
  setModalData?: (data: number) => void;
  icon?: React.ReactNode;
  tastePlaylistName: string;
  tastePlaylistId: number;
  publicOrPrivate: number;
  tastePlaylistDesc: string;
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
    box-shadow: 0.5rem 0.5rem 1.5rem rgba(255, 112, 3, 0.3);
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

function Playlist(props: PlaylistProps) {
  const {
    width,
    openModal,
    setModalData,
    icon,
    tastePlaylistName,
    tastePlaylistId,
    publicOrPrivate,
    tastePlaylistDesc,
  } = props;
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<playList[]>([]);
  return (
    <StyledLink to={`/PlaylistPage/${tastePlaylistId}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card width={width}>
        <CardImage src="/logo.png" alt="" />
        <CardInfoBox>
          <InfoBox>
            <InfoName>
              <InfoHeader>
                <span className={Styles.p1bold}>{tastePlaylistName}&nbsp;&nbsp;</span>
                <span className={Styles.p1}>{tastePlaylistDesc}</span>
              </InfoHeader>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                {publicOrPrivate === 2 ? <BiLock size="2rem" /> : <BiLockOpen size="2rem" />}
                {icon && <Icon>{icon}</Icon>}
              </div>
            </InfoName>
          </InfoBox>
        </CardInfoBox>
      </Card>
    </StyledLink>
  );
}

Playlist.defaultProps = {
  width: '100%',
  openModal: () => null,
  setModalData: () => null,
  icon: null,
};

export default Playlist;
