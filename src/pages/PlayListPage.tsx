import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import axios from 'axios';
import Styles from '../config/globalFontStyle.module.css';
import StyledCard from '../components/StyledCard';
import DeleteModal from '../components/DeleteModal';

const PlayListPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4vh;
  max-width: 1440px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 4vh;
  row-gap: 4vh;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #ffffff;
  box-shadow: 0.5rem 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  min-height: 200px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
  :hover {
    cursor: pointer;
  }
`;

const PlusIcon = styled(AiFillPlusCircle)`
  color: #9b9b9b;
`;
interface Restaurant {
  _id: {
    timestamp: number;
    date: string;
  };
  restaurantId: number;
  name: string;
  cuisineType: string;
  avgPreference: number;
  address: string;
  roadAddress: string;
  number: string;
  businessHours: string;
  tags: string[][];
  imageFile: {
    timestamp: number;
    date: string;
  };
  menu: string[][];
  peculiarTaste: null;
  likeUserList: string[];
  imageUrl: string;
  xposition: number;
  yposition: number;
  banUserList: string[];
}

function PlayListPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const getRestaurant = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`tastePlaylist/getDetail/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const removerestaurantToPlayList = async (playlistId: number | any, restaurantId: number) => {
    const formData = new FormData();
    formData.append('playlistId', playlistId?.toString());
    formData.append('restaurantId', String(restaurantId));
    const response = await axios.post(`tastePlaylist/deleteDetail`, formData);
    getRestaurant();
    setShowDeleteModal(0);
  };
  const [showDeleteModal, setShowDeleteModal] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalData, setModalData] = useState<number>(0);
  useEffect(() => {
    getRestaurant();
  }, []);
  const handle = (number: number) => {
    setShowDeleteModal(1);
    setModalData(number);
  };
  return (
    <>
      <PlayListPageContainer>
        {loading && <div>로딩중</div>}
        <Container>
          <Header className={Styles.h3}>손성민님의 맛플리</Header>
          <GridContainer>
            <Card className={Styles.h3medium}>
              <CardContent
                onClick={() => {
                  navigate(`/main`);
                }}
              >
                <PlusIcon />
                <div style={{ color: '#9B9B9B' }}>맛집 추가하기</div>
              </CardContent>
            </Card>
            {restaurant.map((item) => (
              <StyledCard
                key={item.address}
                restaurant={item}
                showIconBox={false}
                icon={
                  <FiMoreHorizontal
                    size="2.4rem"
                    onClick={(event) => {
                      event.preventDefault();
                      handle(item.restaurantId);
                    }}
                  />
                }
              />
            ))}
          </GridContainer>
        </Container>
      </PlayListPageContainer>
      {showDeleteModal === 1 ? (
        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(0)}
          onDelete={() => removerestaurantToPlayList(id, modalData)}
          modalRef={modalRef}
        />
      ) : null}
    </>
  );
}

export default PlayListPage;
