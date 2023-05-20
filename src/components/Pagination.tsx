import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Styles from '../config/globalFontStyle.module.css';

interface pageProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (data: number) => void;
}
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const PageUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  background-color: #fffdf5;
`;

const PageSpan = styled.button<{ active?: boolean }>`
  border: none;
  cursor: pointer;
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ active }) => (active ? 'white' : '#9b9b9b')};
  background-color: #fffdf5;
  background-color: ${({ active }) => (active ? 'rgba(255, 137, 35, 0.6)' : '#fffdf5')};
  border-radius: 1rem;
  &:hover {
    color: white;
    background-color: rgba(255, 137, 35, 0.6);
  }
`;

function Pagination(props: pageProps) {
  const { postsPerPage, totalPosts, paginate } = props;
  const [currentPageSet, setCurrentPageSet] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPageButtons = 5;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const indexOfLastButton = currentPageSet * maxPageButtons;
  const indexOfFirstButton = indexOfLastButton - maxPageButtons;
  const currentButtons = pageNumbers.slice(indexOfFirstButton, indexOfLastButton);

  const nextPage = () => {
    if (currentPage !== totalPages) {
      if (currentPage < indexOfLastButton) {
        setCurrentPage(currentPage + 1);
        paginate(currentPage + 1);
      } else {
        setCurrentPageSet(currentPageSet + 1);
        paginate(indexOfLastButton + 1);
        setCurrentPage(indexOfLastButton + 1);
      }
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      if (currentPage > indexOfFirstButton + 1) {
        setCurrentPage(currentPage - 1);
        paginate(currentPage - 1);
      } else {
        setCurrentPageSet(currentPageSet - 1);
        paginate(indexOfFirstButton);
        setCurrentPage(indexOfFirstButton);
      }
    }
  };
  const firstPage = () => {
    setCurrentPageSet(1);
    paginate(1);
    setCurrentPage(1);
  };
  const LastPage = () => {
    setCurrentPageSet(Math.ceil(totalPages / maxPageButtons));
    paginate(totalPages);
    setCurrentPage(totalPages);
  };

  // totalPosts가 변경될 때마다 currentPage를 1로 설정하고, currentPageSet도 1로 설정
  useEffect(() => {
    setCurrentPage(1);
    setCurrentPageSet(1);
  }, [totalPosts]);

  return (
    <StyledNav>
      <PageUl>
        <PageSpan className={Styles.p2bold} onClick={firstPage}>
          처음
        </PageSpan>
        <PageSpan className={Styles.p2bold} onClick={prevPage}>
          이전
        </PageSpan>
        {currentButtons.map((number) => (
          <PageSpan
            key={number}
            active={number === currentPage}
            onClick={() => {
              paginate(number);
              setCurrentPage(number);
            }}
            className={Styles.p2bold}
          >
            {number}
          </PageSpan>
        ))}
        <PageSpan className={Styles.p2bold} onClick={nextPage}>
          다음
        </PageSpan>
        <PageSpan className={Styles.p2bold} onClick={LastPage}>
          끝
        </PageSpan>
      </PageUl>
    </StyledNav>
  );
}

export default Pagination;
