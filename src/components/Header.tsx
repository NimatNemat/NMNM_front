import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillSearchHeartFill, BsSearch } from 'react-icons/bs';
import StyledInput from './StyledInput';
import Styles from '../config/globalFontStyle.module.css';
import Modal from './Modal';

const StyledHeader = styled.header`
  display: flex;
  height: 6.4rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;
  border-bottom: 0.1rem solid rgba(208, 208, 208, 1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 137, 35, 0.6);
  font-size: 2.4rem;
  font-weight: 700;
  width: 35px;
  height: 100%;
  display: flex;
  align-items: center;
`;
const StyledImg = styled.img`
  width: 12.5rem;
  height: 5rem;
`;
const Icon = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  gap: 0.5vw;
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }
`;

const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  width: 80%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fefdf5;
  padding: 1rem;
  color: #7c7b7b;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.16);
  &:hover {
    background-color: rgba(255, 137, 35, 0.6);
    color: black;
    cursor: pointer;
  }
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
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

interface User {
  userId: string;
  profileImage: string;
  nickName: string;
}
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
const Searchedbox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2vw;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  margin-top: 1rem;
  overflow: auto;
  padding: 1rem;
`;
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchUserID, setSearchUserID] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setInputValue('');
  };
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/users/all`);
      const userId = sessionStorage.getItem('userId');
      const userList = response.data;
      setAllUsers(userList.filter((user: User) => user.userId !== userId));
    } catch (error) {
      alert('서버오류입니다. 다시 시도해주세요');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (location.pathname === '/') return null;
  const refresh = () => {
    window.location.reload();
  };

  const searchUser = (newValue: string) => {
    if (newValue === '') {
      setSearchedUser([]);
      return;
    }
    setSearchUserID(newValue);
    // 사용자 아이디 검색하는 로직
    let filtered = allUsers;
    filtered = filtered?.filter((user) => user.userId.includes(searchUserID)) || null;
    setSearchedUser(filtered || []);
  };

  return (
    <>
      <StyledHeader>
        {/* 이미지 */}
        {isAuthenticated === 'false' ? (
          <StyledLink to="/">
            <StyledImg src="/logo.png" alt="logo" />
          </StyledLink>
        ) : (
          <StyledLink
            to="/main"
            onClick={() => {
              if (location.pathname === '/main') {
                refresh();
              }
            }}
          >
            <StyledImg src="/logo.png" alt="logo" />
          </StyledLink>
        )}

        {isAuthenticated === 'true' ? (
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <Icon
              type="button"
              className={Styles.p1bold}
              style={{
                border: 'none',
                background: 'none',
                color: 'rgba(255, 137, 35, 0.6)',
                cursor: 'pointer',
              }}
              onClick={openModal}
            >
              <BsFillSearchHeartFill />
            </Icon>
            <Icon
              type="button"
              className={Styles.p1bold}
              style={{
                border: 'none',
                background: 'none',
                color: 'rgba(255, 137, 35, 0.6)',
                cursor: 'pointer',
              }}
              onClick={() => {
                const id = sessionStorage.getItem('userId');
                navigate(`/mypage/${id}`);
              }}
            >
              마이페이지
            </Icon>
            <Icon
              type="button"
              className={Styles.p1bold}
              style={{
                border: 'none',
                background: 'none',
                color: 'rgba(255, 137, 35, 0.6)',
                cursor: 'pointer',
              }}
              onClick={() => {
                sessionStorage.clear();
                sessionStorage.setItem('isAuthenticated', 'false');
                alert('로그아웃 되었습니다.');
                window.location.href = '/';
              }}
            >
              로그아웃
            </Icon>
          </div>
        ) : null}
      </StyledHeader>
      {showModal && (
        <Modal
          background="transparent"
          onClose={() => {
            setShowModal(false);
          }}
          show={showModal}
          modalRef={modalRef}
        >
          <ModalHeader>
            <span className={Styles.h4}>사용자 검색</span>
            <AiOutlineClose
              size="2.4rem"
              onClick={() => {
                closeModal();
              }}
            />
          </ModalHeader>
          <RowDiv>
            <StyledInput
              style={{ width: '100%' }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                searchUser(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  searchUser(inputValue);
                }
              }}
              placeholder="사용자 검색"
              type="text"
            />
            <Icon>
              <BsSearch
                onClick={() => {
                  searchUser(inputValue);
                }}
              />
            </Icon>
          </RowDiv>

          {searchedUser?.length > 0 ? (
            <Searchedbox>
              {searchedUser.map((user) => (
                <OptionDiv
                  className={Styles.p1bold}
                  onClick={() => {
                    navigate(`/mypage/${user.userId}`);
                    closeModal();
                  }}
                >
                  <OptionImgDiv>
                    <img
                      src={`https://nimatnemat.site${user.profileImage}`}
                      alt={user.profileImage}
                      style={{ width: '5rem', height: '5rem', borderRadius: '50%' }}
                    />
                  </OptionImgDiv>
                  <OptionTextDiv>
                    <span>{user.userId}</span>
                    <span>{user.nickName}</span>
                  </OptionTextDiv>
                </OptionDiv>
              ))}
            </Searchedbox>
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default Header;
