import React, { useRef, useState } from 'react';
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
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8.8rem;
  background-color: #fffdf5;
  border: 1px solid #dfdfdf;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* @media (max-width: 768px) {
    width: 50vw;
    height: 50vw;
  } */
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
`;

const RemoveIcon = styled.div`
  cursor: pointer;
  padding: 0.4rem;
  color: white;
  font-size: 1.6rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const EnlargeIcon = styled.div`
  cursor: pointer;
  padding: 0.4rem;
  color: white;
  font-size: 1.6rem;
  position: absolute;
  bottom: 0;
  left: 0;
`;

function ReviewImageUpload() {
  const [fileURL, setFileURL] = useState<string>('/plus.png');
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
    setFileURL('/plus.png'); // 렌더링 이미지 초기화
    setFile(null);
  };

  const onImageEnlarge = (): void => {
    window.open(fileURL, '_black');
  };

  return (
    <Container>
      <Row>
        <ImgContainer
          onClick={(event) => {
            event.preventDefault();
            if (imgUploadInput.current) {
              imgUploadInput.current.click();
            }
          }}
        >
          <ProfileImg src={fileURL} alt="plus" />
          {fileURL !== '/plus.png' && (
            <IconContainer>
              <RemoveIcon onClick={onImageRemove}>x</RemoveIcon>
              <EnlargeIcon onClick={onImageEnlarge}>🔍</EnlargeIcon>
            </IconContainer>
          )}
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
      </Row>
    </Container>
  );
}
export default ReviewImageUpload;
