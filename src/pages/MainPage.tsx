import React, { useState } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';
import StyledTag from '../components/StyledTag';
import StyledCard from '../components/StyledCard';
import StyledModal from '../components/StyledModal';

const MainPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
  width: 100%;
`;
const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6vh;
  width: 100%;
  align-items: flex-start;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vh;
  width: 100%;
  @media (max-width: 470px) {
    justify-content: center;
    align-items: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;

const GridHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10vw;
`;

const NavItem = styled.div<{ active?: boolean }>`
  color: ${({ active }) => (active ? 'black' : 'white')};
  background: ${({ active }) => (active ? '#FFFDF5' : 'rgba(0, 0, 0, 0.6)')};
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const icons = require.context('../assets/icons', true);

function MainPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<number>(0);
  const [blur, setBlur] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('reco1');

  const handleModalData = (data: number) => {
    setModalData(data);
  };
  const openModal = () => {
    setShowModal(true);
    setBlur(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setBlur(false);
  };
  const blurStyle = {
    opacity: blur ? '0.5' : '1',
    PointerEvents: blur ? 'none' : 'auto',
  };
  const showFirstRecoBox = () => {
    return (
      <GridContainer>
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
        <StyledCard
          imgSrc="/img.png"
          likes="12개"
          name="마리모"
          category="돈까스, 우동"
          hashtag="#일식 가정식 #혼밥 #제로페이"
          setModalData={handleModalData}
          openModal={openModal}
        />
      </GridContainer>
    );
  };

  return (
    <>
      <MainPageContainer className="MainPage" style={blurStyle}>
        <Container>
          <ListContainer>
            <TagContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                종류
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag imgSrc={icons('./china.png')} text="중식" />
                <StyledTag imgSrc={icons('./japan.png')} text="일식" />
                <StyledTag imgSrc={icons('./us.png')} text="양식" />
              </TagListContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                태그
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag imgSrc={icons('./china.png')} text="중식" />
                <StyledTag imgSrc={icons('./japan.png')} text="일식" />
                <StyledTag imgSrc={icons('./us.png')} text="양식" />
              </TagListContainer>
              <div className={Styles.h3} style={{ width: '100%', textAlign: 'left' }}>
                함께먹기
              </div>
              <TagListContainer>
                <StyledTag imgSrc={icons('./korea.png')} text="한식" />
                <StyledTag text="+" />
              </TagListContainer>
            </TagContainer>
            <GridHeaderContainer>
              <Nav>
                <NavItem className={Styles.h3} active={selected === 'reco1'} onClick={() => setSelected('reco1')}>
                  진정한 한국인의 추천리스트
                </NavItem>
                <NavItem className={Styles.h3} active={selected === 'reco2'} onClick={() => setSelected('reco2')}>
                  당신만을 위한 추천리스트
                </NavItem>
              </Nav>
            </GridHeaderContainer>
            {selected === 'reco1' ? showFirstRecoBox() : null}
          </ListContainer>
        </Container>
      </MainPageContainer>
      {showModal ? <StyledModal show={showModal} onClose={closeModal} data={modalData} /> : null}
    </>
  );
}

export default MainPage;
