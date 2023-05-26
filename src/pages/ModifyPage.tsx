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
function ModifyPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [User, setUser] = useState<User | null>(null);
  const [nicknameValue, setNicknameValue] = useState('');
  const [detailValue, setDetailValue] = useState<string>('');
  const [fileurl, setFileurl] = useState<string>('');

  const handleNicknameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
  };
  const handleDetailEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetailValue(event.target.value);
  };
  const modifyUser = async (formData: FormData) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }

    const response = await axios
      .put(`/users/update?userId=${sessionStorage.getItem('userId')}`, {
        nickName: nicknameValue,
        infoMessage: detailValue,
      })
      .then((res) => {
        window.location.href = '/main';
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const loadUser = async () => {
    try {
      const response = await axios.get(`/users/userId?userId=${sessionStorage.getItem('userId')}`);
      setUser(response.data);
      setNicknameValue(response.data.nickName);
      setDetailValue(response.data.infoMessage);
      setFileurl(response.data.profileImage);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const [file, setFile] = useState<FileList | null>(null);
  const postImage = async (file: FileList) => {
    const formData = new FormData();
    formData.append('image', file[0]);
    try {
      const response = await axios.post(`/users/upload-image?userId=${sessionStorage.getItem('userId')}`, formData);
      setFileurl(response.data);
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    }
  };
  const Submitfunction = async () => {
    const formData = new FormData();
    if (nicknameValue === '') {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (detailValue === '') {
      alert('세부사항을 입력해주세요.');
      return;
    }
    formData.append('nickName', nicknameValue);
    formData.append('infoMessage', detailValue);
    await modifyUser(formData);
    if (file !== null) {
      await postImage(file);
    }
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
      {loading ? (
        <div>로딩중</div>
      ) : (
        <Container>
          <span className={Styles.h3}>회원 정보 수정</span>
          <ImageUpload file={file} setFile={setFile} fileUrl={fileurl} />
          <span className={Styles.p1bold}>닉네임</span>
          <StyledInput
            value={nicknameValue}
            type="text"
            placeholder="변경할 닉네임을 입력해주세요."
            style={{ width: '100%' }}
            onChange={handleNicknameEvent}
          />

          <span className={Styles.p1bold}>세부 사항</span>
          <Div>
            <DetailArea value={detailValue} onChange={handleDetailEvent} placeholder="세부 사항을 적어주세요." />
          </Div>
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
        </Container>
      )}
    </ModifyPageContainer>
  );
}
const ModifyPageContainer = styled.div`
  display: flex;
  justify-content: center;
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
const DetailArea = styled.textarea`
  border: 1px solid #dfdfdf;
  padding: 1.6rem 1.6rem;
  width: 100%;
  height: 10rem;
  background-color: #fffdf5;
  resize: none;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${css`
    color: rgba(128, 128, 128, 0.3);
  `}
`;

export default ModifyPage;
