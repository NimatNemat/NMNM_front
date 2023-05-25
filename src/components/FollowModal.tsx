import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from './StyledButton';

interface FollowUser {
  userId: string;
  nickName: string;
  profileImage: string | null;
}

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  userList: FollowUser[] | null;
  modalRef: React.ForwardedRef<HTMLDivElement>;
  isFollowing: boolean;
  onFollowChange: () => void;
}

const ModalWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalContent = styled.div`
  display: flex;
  width: 30%;
  background-color: white;
  border-radius: 2rem;
  padding: 4rem;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.4vh;
  @media (max-width: 768px) {
    width: 50%;
  }
  @media (min-width: 768px) {
    width: 40%;
  }
  @media (min-width: 1024px) {
    width: 30%;
  }
  @media (min-width: 1440px) {
    width: 20%;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const OptionInfo = styled.div`
  display: flex;
  gap: 1vw;
  :hover {
    cursor: pointer;
  }
`;
const OptionImgDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const OptionTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2vh;
`;
const OptionBtnDiv = styled.div`
  display: flex;
`;

function FollowModal(props: ModalProps) {
  const { onClose = () => null, show, userList, modalRef, isFollowing, onFollowChange } = props;
  const [followingList, setFollowingList] = useState<FollowUser[]>([]);
  const userId = sessionStorage.getItem('userId') || '';
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleBtnClick = async (isFollow: boolean, id: string) => {
    await follow(isFollow, id);
    await fetchData();
    onFollowChange();
  };

  const fetchData = async () => {
    try {
      if (userId) {
        const response = await axios.get(`/follows/getMyfollows?userId=${userId}`);
        setFollowingList(response.data);
      }
    } catch (error) {
      console.error('fetching user following list error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const follow = async (isFollow: boolean, id: string) => {
    const token = sessionStorage.getItem('token');
    let response;
    const formData = new FormData();
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    try {
      if (id) {
        formData.append('targetId', id);
        if (isFollow) {
          response = await axios.post(`/follows/follow`, formData);
        } else {
          response = await axios.post(`/follows/unfollow`, formData);
        }
      }
    } catch (error) {
      console.error('Follow Api error', error);
    }
  };

  const handleProfileClick = (userId: string) => {
    navigate(`/mypage/${userId}`);
    handleClose();
  };

  return (
    <ModalWrapper show={show} ref={modalRef} onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          {isFollowing ? <span className={Styles.h4}>팔로잉</span> : <span className={Styles.h4}>팔로워</span>}
          <AiOutlineClose size="2.4rem" onClick={handleClose} />
        </ModalHeader>
        {userList?.map((user) => (
          <OptionDiv key={user.userId}>
            <OptionInfo onClick={() => handleProfileClick(user.userId)}>
              <OptionImgDiv>
                <img
                  src={`https://nimatnemat.site${user.profileImage}`}
                  alt={user.nickName}
                  style={{ width: '5rem', height: '5rem', borderRadius: '50%' }}
                />
              </OptionImgDiv>
              <OptionTextDiv>
                <span className={Styles.p1bold}>{user.userId}</span>
                <span>{user.nickName}</span>
              </OptionTextDiv>
            </OptionInfo>
            {user.userId !== userId &&
              (followingList.some((follow) => follow.userId === user.userId) ? (
                <OptionBtnDiv>
                  <StyledButton
                    onClick={() => handleBtnClick(false, user.userId)}
                    borderRadius="1rem"
                    padding="0.8rem 2.4rem"
                    color="rgba(128, 128, 128, 1)"
                  >
                    <div className={Styles.p1bold}>팔로잉</div>
                  </StyledButton>
                </OptionBtnDiv>
              ) : (
                <OptionBtnDiv>
                  <StyledButton
                    onClick={() => handleBtnClick(true, user.userId)}
                    borderRadius="1rem"
                    padding="0.8rem 2.4rem"
                  >
                    <div className={Styles.p1bold}>팔로우</div>
                  </StyledButton>
                </OptionBtnDiv>
              ))}
          </OptionDiv>
        ))}
      </ModalContent>
    </ModalWrapper>
  );
}

FollowModal.defaultProps = {
  onClose: () => null,
};

export default FollowModal;
