import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Pagination({ total, limit, pageNum, setPage }) {
  //const { total, limit, page, setPage } = props;
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <PageNav>
        <ArrowButton
          onClick={() => setPage(pageNum - 1)}
          disabled={pageNum === 1}
        >
          &lt;
        </ArrowButton>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={pageNum === i + 1 ? "page" : null}
            >
              {i + 1}
            </PageButton>
          ))}
        <ArrowButton
          onClick={() => setPage(pageNum + 1)}
          disabled={pageNum === numPages}
        >
          &gt;
        </ArrowButton>
      </PageNav>
    </>
  );
}

const PageNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;
const ArrowButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  margin: 0;
  background-color: #757677;
  color: white;
  font-size: 1rem;
`;
const PageButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #cce2df;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #006e5f;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
