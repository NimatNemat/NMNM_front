import React, { useState } from 'react';
import styled from 'styled-components';

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
`;

const PageSpan = styled.button<{ active?: boolean }>`
  border: ${({ active }) => (active ? '2px solid #000' : 'none')};
  cursor: pointer;
  height: 4rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ active }) => (active ? '#FFFFFF' : '#FFFDF5')};

  &:hover {
    border: 2px solid #000;
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
    if (currentPageSet < Math.ceil(totalPages / maxPageButtons)) {
      setCurrentPageSet(currentPageSet + 1);
      paginate(indexOfLastButton + 1);
      setCurrentPage(indexOfLastButton + 1);
    }
  };
  const prevPage = () => {
    if (currentPageSet > 1) {
      setCurrentPageSet(currentPageSet - 1);
      paginate(indexOfFirstButton);
      setCurrentPage(indexOfFirstButton);
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

  return (
    <StyledNav>
      <PageUl>
        <PageSpan onClick={firstPage}>&lt;&lt;</PageSpan>
        <PageSpan onClick={prevPage}>&lt;</PageSpan>
        {currentButtons.map((number) => (
          <PageSpan
            key={number}
            active={number === currentPage}
            onClick={() => {
              paginate(number);
              setCurrentPage(number);
            }}
          >
            {number}
          </PageSpan>
        ))}
        <PageSpan onClick={nextPage}>&gt;</PageSpan>
        <PageSpan onClick={LastPage}>&gt;&gt;</PageSpan>
      </PageUl>
    </StyledNav>
  );
}

export default Pagination;
