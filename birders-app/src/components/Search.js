import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Grid from "../elements/Grid";
import { Text } from "../elements/Common";
import SampleImg from "../images/bird_sample.jpg";
import { Link, useParams } from "react-router-dom";

const Search = (props) => {
  const onSearch = props.onSearch;
  const [searchInput, setSearchInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  function handleChange(e) {
    setSearchInput(e.target.value);
  }
  function startSearch() {
    //console.log(searchInput);
    setIsSearched(true);
    onSearch(searchInput);
  }
  function cancelSearch() {
    setSearchInput("");
    setIsSearched(false);
    onSearch("");
  }
  return (
    <>
      <SearchContainer>
        <SearchInput>
          <input
            type="text"
            name="searchText"
            onChange={handleChange}
            value={searchInput}
            placeholder="게시글 제목을 입력하세요"
          />
        </SearchInput>
        {isSearched ? (
          <SearchButton onClick={cancelSearch}>취소</SearchButton>
        ) : (
          <SearchButton onClick={startSearch}>검색</SearchButton>
        )}
      </SearchContainer>
      {isSearched && <Helper>검색결과만 보이고 있어요</Helper>}
    </>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: between;
`;
const SearchButton = styled.button`
  box-sizing: border-box;
  resize: none;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem 0 0.5rem 0.25rem;
  outline: none;
  border: 1px solid #006e5f;
  border-radius: 4px;
  min-height: 2rem;
  font-size: 14px;
  color: #006e5f;
  line-height: 1.75;
  cursor: pointer;
  background-color: white;
  white-space: nowrap;
`;
const Helper = styled.p`
  font-size: 14px;
  color: #006e5f;
  margin: 0.05rem 0 0.75rem 0;
`;
const Wrapper = styled.div`
  display: flex;
  width: 280px;
  flex-direction: column;
`;
const SearchContainer = styled.div`
  width: 40%;
  justify-content: between;
  align-items: center;
  display: flex;
`;
const SearchInput = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;

  & input {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    margin: 0.5rem 0;
    border-radius: 4px;
    border: 1px solid gray;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
`;

export default Search;
