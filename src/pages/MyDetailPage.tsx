import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';
import StyledInput from '../components/StyledInput';
import Styles from '../config/globalFontStyle.module.css';
import StyledButton from '../components/StyledButton';
import ImageUpload from '../components/ImageUpload';
import PwdModal from '../components/PwdModal';

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pwdChangeClicked, setPwdChangeClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNicknameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const modifyUser = async (formData: FormData) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    try {
      const response = await axios.put('/users/change-email', formData);
      alert('이메일이 변경되었습니다.');
      window.location.href = `/mypage/${sessionStorage.getItem('userId')}`;
    } catch (error) {
      console.error('Error fetching data', error);
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
  const cancel = () => {
    window.location.href = `/mypage/${sessionStorage.getItem('userId')}`;
  };
  const Submitfunction = () => {
    const formData = new FormData();
    formData.append('newEmail', email);
    modifyUser(formData);
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    loadUser();
  }, []);

  const ChangePwdFunction = () => {
    setShowModal(true);
    setPwdChangeClicked(true);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const loginUser = async (formData: FormData) => {
    try {
      const response = await axios.post('/users/login', formData);
      const userId = sessionStorage.getItem('userId');
      if (response.status === 200) {
        if (pwdChangeClicked) {
          sessionStorage.setItem('pwdAuthenticated', 'true');
          navigate(`/pwdchange/${userId}`);
        } else {
          UserOutfunction();
        }
      } else {
        alert('아이디, 비밀번호를 다시 한번 확인하세요.');
      }
    } catch (error) {
      alert('아이디, 비밀번호를 다시 한번 확인하세요.');
    }
  };
  const Loginfunction = (pwd: string) => {
    const formData = new FormData();
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      formData.append('userId', userId);
    }
    formData.append('password', pwd);
    loginUser(formData);
  };

  return (
    <>
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
                <StyledButton onClick={cancel} color="F2F4F6">
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
            <Row>
              <div>
                <UseroutBtn onClick={ChangePwdFunction} btnColor="rgba(255, 137, 35, 0.6)">
                  <span className={Styles.p1bold}>비밀번호 변경</span>
                </UseroutBtn>
              </div>
              <div>
                <UseroutBtn onClick={() => setShowModal(true)} btnColor="#ff0000">
                  <span className={Styles.p1bold}>회원탈퇴</span>
                </UseroutBtn>
              </div>
            </Row>
          </EndBox>
        </Container>
      </ModifyPageContainer>
      {showModal ? (
        <PwdModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setPwdChangeClicked(false);
          }}
          onConfirm={(pwd) => {
            Loginfunction(pwd);
          }}
          modalRef={modalRef}
        />
      ) : null}
    </>
  );
}
const ModifyPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const UseroutBtn = styled.button<{ btnColor: string }>`
  background-color: ${({ btnColor }) => btnColor};
  color: #ffffff;
  border: 1px solid ${({ btnColor }) => btnColor};
  width: 100%;
  height: 2.4rem;
  border-radius: 0.8rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    background-color: ${({ btnColor }) => btnColor};
    color: #ffffff;
    border: 1px solid ${({ btnColor }) => btnColor};
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
  flex-direction: row;
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
