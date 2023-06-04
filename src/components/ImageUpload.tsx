import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  file: FileList | null;
  setFile: React.Dispatch<React.SetStateAction<FileList | null>>;
}
function ImageUpload(props: Props) {
  const { fileUrl, file, setFile } = props;
  const [fileURL, setFileURL] = useState<string>(fileUrl);
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
    setFileURL('/images/646f673fe659b357ce17f902'); // 렌더링 이미지 초기화
    setFile(null);
  };
  useEffect(() => {
    setFileURL(fileUrl);
  }, [fileUrl]);

  return (
    <Container>
      <Row>
        <ImgContainer>
          {file ? (
            <ProfileImg src={fileURL} alt="profile" />
          ) : (
            <ProfileImg src={`https://nimatnemat.site${fileURL}`} alt="profile" />
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
