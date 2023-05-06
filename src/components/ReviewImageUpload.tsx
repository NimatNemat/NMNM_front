import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineClose, AiOutlineArrowsAlt } from 'react-icons/ai';
import Styles from '../config/globalFontStyle.module.css';

const Container = styled.div`
  width: 100%;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
  position: relative;
  display: flex;
  width: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease;
`;
const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8.8rem;
  background-color: #fffdf5;
  border: 1px solid #dfdfdf;
  &:hover ${IconContainer} {
    opacity: 1;
  }
`;

const RemoveIcon = styled.div`
  cursor: pointer;
  padding: 0.4rem;
  color: white;
  font-size: 1.6rem;
  position: absolute;
  bottom: 0;
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

const ImageCountDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

interface ReviewImageUploadProps {
  index: number;
  onUpload: () => void;
  onDelete: () => void;
}

function ReviewImageUpload({ index, onUpload, onDelete }: ReviewImageUploadProps) {
  const [fileURL, setFileURL] = useState<string>('/plus.png');
  const [file, setFile] = useState<FileList | null>(null);
  const [key, setKey] = useState<number>(0);
  const imgUploadInput = useRef<HTMLInputElement | null>(null);
  const [firstUpload, setFirstUpload] = useState<boolean>(true);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFile(files);
      const newFileURL = URL.createObjectURL(files[0]);
      setFileURL(newFileURL);
      if (firstUpload) {
        onUpload();
        setFirstUpload(false);
      }
    }
    setKey((prevKey) => prevKey + 1);
  };

  const onImageRemove = (event: React.MouseEvent): void => {
    event.stopPropagation();
    URL.revokeObjectURL(fileURL);
    setFileURL('/plus.png'); // 렌더링 이미지 초기화
    setFile(null);
    onDelete();
  };

  const onImageEnlarge = (): void => {
    window.open(fileURL, '_black');
  };

  return (
    <Container>
      <Col>
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
              <RemoveIcon onClick={(event) => onImageRemove(event)}>
                <AiOutlineClose />
              </RemoveIcon>
              <EnlargeIcon onClick={onImageEnlarge}>
                <AiOutlineArrowsAlt />
              </EnlargeIcon>
            </IconContainer>
          )}
        </ImgContainer>
        <ImageCountDiv>{index}/3</ImageCountDiv>
      </Col>
      <Col>
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
      </Col>
    </Container>
  );
}
export default ReviewImageUpload;
