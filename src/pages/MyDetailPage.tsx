import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import StyledInput from '../components/StyledInput';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';
import ImageUpload from '../components/ImageUpload';

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
  userId: string;
}
function MydetailPage() {
  const [User, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [detailValue, setDetailValue] = useState<string>('');
  const handleNicknameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const modifyUser = async (formData: FormData) => {
    try {
      const response = await axios.post('#', formData);
      window.location.href = '/main';
    } catch (error) {
      alert('에러');
    }
  };
  const loadUser = async () => {
    try {
      const response = await axios.get(`/users/userId?userId=${sessionStorage.getItem('userId')}`);
      setUser(response.data);
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const UserOutfunction = () => {
    const result = window.confirm('정말로 탈퇴하시겠습니까?');
    if (result) {
      // 확인 버튼 클릭 시 동작
      // 회원탈퇴
      const token = sessionStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common.Authorization = token;
      }
      console.log(token);
      axios
        .delete('/users/delete')
        .then((res) => {
          alert('회원탈퇴가 완료되었습니다.');
          sessionStorage.clear();
          window.location.href = '/';
        })
        .catch((err) => {
          alert('회원탈퇴에 실패하였습니다.');
        });
    }
  };
  const Submitfunction = () => {
    const formData = new FormData();
    formData.append('nickname', email);
    formData.append('detail', detailValue);
    modifyUser(formData);
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    loadUser();
  }, []);

  return (
    <ModifyPageContainer>
      <Container>
        <span className={Styles.h3}>내 정보</span>
        <span className={Styles.p1bold}>이메일</span>
        <StyledInput
          value={email}
          type="text"
          placeholder="이메일 주소를 입력하세요."
          style={{ width: '100%' }}
          onChange={handleNicknameEvent}
        />

        <span className={Styles.p1bold}>생년월일</span>
        <StyledDiv>
          <div style={{ padding: '1.6rem 1.6rem' }}>
            {User?.birthdate
              ? `${User.birthdate.slice(0, 4)}년 ${User.birthdate.slice(5, 7)}월 ${User.birthdate.slice(8, 10)}일`
              : ''}
          </div>
        </StyledDiv>
        <span className={Styles.p1bold}>성별</span>
        <StyledDiv>
          <div style={{ padding: '1.6rem 1.6rem' }}>{User?.gender === 0 ? '남자' : '여자'}</div>
        </StyledDiv>
        <EndBox>
          <Row>
            <div>
              <StyledButton onClick={Submitfunction} color="F2F4F6">
                <span className={Styles.p1bold}>취소</span>
              </StyledButton>
            </div>
            <div>
              <StyledButton onClick={Submitfunction}>
                <span className={Styles.p1bold}>수정하기</span>
              </StyledButton>
            </div>
          </Row>
        </EndBox>
        <EndBox>
          <div style={{}}>
            <UseroutBtn onClick={UserOutfunction}>
              <span className={Styles.p1bold}>회원탈퇴</span>
            </UseroutBtn>
          </div>
        </EndBox>
      </Container>
    </ModifyPageContainer>
  );
}
const ModifyPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const UseroutBtn = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: 1px solid #ff0000;
  width: 100%;
  height: 2.4rem;
  border-radius: 0.8rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    background-color: #ff0000;
    color: #ffffff;
    border: 1px solid #ff0000;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  & h1 {
    margin: 0;
  }
  gap: 2.4rem;
  width: 50%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 1.2rem;
`;
const EndBox = styled.div`
  display: flex;

  justify-content: end;
  align-items: center;
  width: 100%;
`;
const StyledDiv = styled.div`
  width: 100%;
  border: 1px solid #dfdfdf;
  background: #fffdf5;
  ::placeholder {
    font-size: 1.4rem;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MydetailPage;
