import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, InputActionMeta, SingleValue, components } from 'react-select';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

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

interface User {
  userId: string;
  profileImage: string;
  nickName: string;
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const [inputValue, setInputValue] = useState<string>('');
  const [searchUserID, setSearchUserID] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/users/all`);
      const userId = sessionStorage.getItem('userId');
      const userList = response.data;
      setAllUsers(userList.filter((user: User) => user.userId !== userId));
      console.log(allUsers);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (location.pathname === '/') return null;
  const refresh = () => {
    window.location.reload();
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
        <img
          src={profileImage || '/default.png'}
          alt={label}
          style={{ width: '5rem', height: '5rem', borderRadius: '50%' }}
        />
      </OptionImgDiv>
      <OptionTextDiv>
        <span>{label}</span>
        <span>{nickName}</span>
      </OptionTextDiv>
    </OptionDiv>
  );

  const searchUser = (newValue: string, actionMeta: InputActionMeta) => {
    setSearchUserID(newValue);
    // 사용자 아이디 검색하는 로직
    let filtered = allUsers;
    filtered = filtered?.filter((user) => user.userId.includes(searchUserID)) || null;

    setSearchedUser(filtered || []);
  };

  const handleUserSelect = (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (newValue !== null) {
      navigate(`/mypage/${newValue.value}`);
    }
  };

  return (
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
          <Select
            autoFocus
            value={selectedOption}
            options={
              inputValue
                ? searchedUser.map((user) => ({
                    value: user.userId,
                    label: user.userId,
                    profileImage: `https://nimatnemat.site${user.profileImage}`,
                    nickName: user.nickName,
                  }))
                : []
            }
            isSearchable
            onInputChange={(input, action) => {
              setInputValue(input);
              searchUser(input, action);
            }}
            onChange={(value, action) => {
              handleUserSelect(value, action);
              setSelectedOption(null);
            }}
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
  );
}

export default Header;
