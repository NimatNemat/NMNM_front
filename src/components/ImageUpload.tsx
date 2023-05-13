import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StyledButton from './StyledButton';
import Styles from '../config/globalFontStyle.module.css';

const Container = styled.div`
  width: 100%;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.2rem;
`;

const Btnbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileImg = styled.img`
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 1px solid #dfdfdf;
  @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
  }

  @media (max-width: 425px) {
    width: 50vw;
    height: 50vw;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;
interface Props {
  fileUrl: string;
}
function ImageUpload(props: Props) {
  const { fileUrl } = props;
  const [fileURL, setFileURL] = useState<string>(fileUrl);
  const [file, setFile] = useState<FileList | null>(null);
  const [key, setKey] = useState<number>(0);
  const imgUploadInput = useRef<HTMLInputElement | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFile(files);
      const newFileURL = URL.createObjectURL(files[0]);
      setFileURL(newFileURL);
    }
    setKey((prevKey) => prevKey + 1);
  };

  const onImageRemove = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('https://cdn-icons-png.flaticon.com/512/1555/1555492.png'); // 렌더링 이미지 초기화
    setFile(null);
  };
  // const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   /** 서버통신 */
  //   const formData = new FormData();

  //   if (file) {
  //     formData.append('file', file[0]);

  //     try {
  //       const response = await axios.post('/api/upload', formData, {
  //         headers: { 'content-type': 'multipart/form-data' },
  //       });
  //     } catch (error: any) {
  //       console.log('이미지업로드 에러 발생');
  //       throw new Error(error);
  //     }
  //   } else {
  //     alert('업로드할 이미지가 없습니다');
  //   }
  // };
  useEffect(() => {
    setFileURL(fileUrl);
  }, [fileUrl]);

  return (
    <Container>
      <Row>
        <ImgContainer>
          <ProfileImg src={fileURL} alt="profile" />
        </ImgContainer>
      </Row>
      <Row>
        <input
          type="file"
          id="img"
          key={key}
          accept="image/*"
          required
          ref={imgUploadInput}
          onChange={onImageChange}
          style={{ display: 'none' }}
        />
        <Btnbox>
          <StyledButton
            onClick={(event) => {
              event.preventDefault();
              if (imgUploadInput.current) {
                imgUploadInput.current.click();
              }
            }}
            padding="0.8rem"
          >
            <span className={Styles.p2bold}>선택</span>
          </StyledButton>
        </Btnbox>
        <Btnbox>
          <StyledButton onClick={onImageRemove} color="#F2F4F6" padding="0.8rem">
            <span className={Styles.p2bold}>기본 프로필</span>
          </StyledButton>
        </Btnbox>
      </Row>
    </Container>
  );
}
export default ImageUpload;
