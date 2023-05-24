import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose, AiOutlinePlus, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import axios from 'axios';
import Styles from '../config/globalFontStyle.module.css';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';

interface ModalProps {
  onClose?: () => void;
  show: boolean;
  modalData: number;
  modalRef: React.ForwardedRef<HTMLDivElement>;
  addPlayList: (userId: string, playListName: string, playListDesc: string, lock: number) => void;
  addrestaurantToPlayList: (playlistId: number, restaurantId: number) => void;
  removerestaurantToPlayList: (playlistId: number, restaurantId: number) => void;
}

interface ModalRowProps {
  playListName: string;
  locked: boolean;
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
`;
const ModalContent = styled.div`
  display: flex;
  width: 20rem;
  background-color: white;
  border-radius: 2rem;
  padding: 3.2rem;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.4rem;
`;
const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
const Button = styled.div`
  display: flex;
  width: 10rem;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1.2vh;
`;
const Styledselect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0;
  text-align: left;
  width: 100%;
  border: none;
  border-bottom: 1px solid #6e6e6e;
  color: rgba(128, 128, 128);
  background: #ffffff;
  appearance: none;
  -webkit-appearance: none; // 크롬, 사파리 등 웹킷 기반 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 파이어폭스에서 기본 스타일 제거
`;
interface playList {
  tastePlaylistName: string;
  tastePlaylistDesc: string;
  publicOrPrivate: number;
  playlistDetail: number[];
  tastePlaylistId: number;
}
function StyledModal(props: ModalProps) {
  const [playlist, setPlaylist] = useState<playList[]>([]);
  const {
    onClose = () => null,
    show,
    modalData,
    modalRef,
    addPlayList,
    addrestaurantToPlayList,
    removerestaurantToPlayList,
  } = props;
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [playListName, setPlayListName] = useState<string>('');
  const [playListDesc, setPlayListDesc] = useState<string>('');
  const [lock, setLock] = useState<number>(1);
  const [chekced, setChecked] = useState<boolean>(false);
  const userId = sessionStorage.getItem('userId');
  const fetchPlayList = async () => {
    const response = await axios.get(`tastePlaylist/getTastePlaylist?userId=${userId}`);
    setPlaylist(response.data);
  };
  useEffect(() => {
    fetchPlayList();
  }, []);

  const setInputVisibleFalse = () => {
    setInputVisible(false);
  };

  const handleClose = () => {
    setInputVisibleFalse();
    onClose();
  };

  const handleSubmit = async () => {
    if (playListName !== '') {
      await addPlayList(userId!, playListName, playListDesc, lock);
      fetchPlayList();
      setPlayListName('');
      setPlayListDesc('');
      setInputVisible(false);
    }
  };

  const handleaddrestaurantToPlayList = async (playlistId: number | any) => {
    await addrestaurantToPlayList(playlistId, modalData);
    fetchPlayList();
  };
  const handleremovereataurantToPlayList = async (playlistId: number | any) => {
    await removerestaurantToPlayList(playlistId, modalData);
    fetchPlayList();
  };
  const handlePlayListNameEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayListName(event.target.value);
  };
  const handlePlayListDescEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayListDesc(event.target.value);
  };

  const handleLockEvent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLock(Number(event.target.value));
  };

  const showInputBox = () => {
    return (
      <Div>
        <RowDiv>
          <div className={Styles.p1bold} style={{ width: '100%', textAlign: 'left' }}>
            이름
          </div>
          <StyledInput
            value={playListName}
            type="text"
            placeholder="맛플리 이름 입력"
            style={{ width: '100%' }}
            onChange={handlePlayListNameEvent}
            border="none"
            borderBottom="1px solid #6E6E6E"
            background="#FFFFFF"
            padding="0.2rem 0"
          />
        </RowDiv>
        <RowDiv>
          <div className={Styles.p1bold} style={{ width: '100%', textAlign: 'left' }}>
            세부설명
          </div>
          <StyledInput
            value={playListDesc}
            type="text"
            placeholder="맛플리 세부 설명"
            style={{ width: '100%' }}
            onChange={handlePlayListDescEvent}
            border="none"
            borderBottom="1px solid #6E6E6E"
            background="#FFFFFF"
            padding="0.2rem 0"
          />
        </RowDiv>
        <RowDiv>
          <div className={Styles.p1bold} style={{ width: '100%', textAlign: 'left' }}>
            공개 범위 설정
          </div>
          <Styledselect className={Styles.p1bold} value={lock} onChange={handleLockEvent}>
            <option value={1}>공개</option>
            <option value={2}>비공개</option>
          </Styledselect>
        </RowDiv>
        <ButtonBox>
          <Button>
            <StyledButton onClick={handleSubmit} borderRadius="3rem" padding="1rem">
              <span className={Styles.p2bold}>만들기</span>
            </StyledButton>
          </Button>
        </ButtonBox>
      </Div>
    );
  };
  return (
    <ModalWrapper show={show} ref={modalRef} onClick={onClose}>
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <span className={Styles.h3}>그룹선택</span>
          <AiOutlineClose size="2.4rem" onClick={handleClose} />
        </ModalHeader>
        {playlist.map((data) => (
          <ModalRow key={data.tastePlaylistName}>
            <IconBox>
              {data.playlistDetail.includes(modalData) ? (
                <BiCheckboxChecked
                  size="2rem"
                  color="#6E6E6E"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleremovereataurantToPlayList(data.tastePlaylistId);
                  }}
                />
              ) : (
                <BiCheckbox
                  size="2rem"
                  color="#372323"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleaddrestaurantToPlayList(data.tastePlaylistId);
                  }}
                />
              )}
            </IconBox>
            <TextBox>
              <span className={Styles.p1bold} style={{ color: '#6E6E6E' }}>
                {data.tastePlaylistName}
              </span>
            </TextBox>
            <IconBox>
              {data.publicOrPrivate === 1 ? (
                <AiOutlineUnlock size="2rem" color="#6E6E6E" />
              ) : (
                <AiOutlineLock size="2rem" color="#6E6E6E" />
              )}
            </IconBox>
          </ModalRow>
        ))}
        {inputVisible ? (
          showInputBox()
        ) : (
          <ModalRow onClick={() => setInputVisible(true)}>
            <IconBox>
              <AiOutlinePlus size="2rem" color="#6E6E6E" />
            </IconBox>
            <TextBox>
              <span className={Styles.p1bold} style={{ color: '#6E6E6E' }}>
                새폴더 생성
              </span>
            </TextBox>
          </ModalRow>
        )}
      </ModalContent>
    </ModalWrapper>
  );
}

StyledModal.defaultProps = {
  onClose: () => null,
};
export default StyledModal;
