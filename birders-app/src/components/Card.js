import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import Grid from "../elements/Grid";
import { Text, Tag } from "../elements/Common";
import SampleImg from "../images/bird_sample.jpg";
import { Link } from "react-router-dom";
import OnErrorImg from "../images/bird_sample.jpg";
const Card = (props) => {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;
  // console.log(props);
  const post = props.post;
  const postId = post.id;
  // console.log(post.createdAt);
  const postCreateAt = new Date(post.createdAt).toLocaleString();
  const convertCategory = (categoryName) => {
    switch (categoryName) {
      case "question":
        return "새문답";
      case "news":
        return "새뉴스";
      case "fieldNote":
        return "탐조기록";
      default:
        return categoryName;
    }
  };

  const handleImgError = (e) => {
    e.target.src = OnErrorImg;
  };
  return (
    <>
      <StyledPostTitleLink
        to={isLoggedIn ? `/post/${postId}` : "/login"}
        key={postId}
      >
        <CardContainer>
          <Box1
            src={post.thumbnailSrc ? post.thumbnailSrc : SampleImg}
            onClick={() => {
              console.log("이미지클릭");
            }}
            onError={handleImgError}
          />
          <Box2>
            <Grid padding="0.25rem" left>
              <TextTriming font_size="16px" bold padding={"0.5rem 0"}>
                {post.title}
              </TextTriming>
              <TextTriming font_size="14px" padding={"0.25rem 0 0.75rem 0"}>
                {" "}
                {post.textContents}
              </TextTriming>
              <Tag size="sm" color="#006e5f">
                #{convertCategory(post.categoryName)}
              </Tag>
              <Text size="8px" color="grey">
                {postCreateAt}
              </Text>
            </Grid>
          </Box2>
          <Box3>
            <Grid is_flex padding="12px">
              <Grid is_flex width="auto">
                <Text size="8pt">by</Text>
                <Text bold size="8pt" margin="0 0 0 5px">
                  {post.userDisplayName}
                </Text>
              </Grid>
              <Grid is_flex width="auto">
                <Text blod size="8pt" margin="0px 5px 0px 5px">
                  {post.likes} ♥︎ liked
                </Text>
              </Grid>
            </Grid>
          </Box3>
        </CardContainer>
      </StyledPostTitleLink>
    </>
  );
};

const StyledPostTitleLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const TextTriming = styled.div`
  width: 90%;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${(props) => props.font_size};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;
const CardContainer = styled.div`
  width: 250px;
  max-width: 335px;
  min-height: 0;
  overflow: hidden;
  margin: 1.1rem;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  background-color: ${(props) => props.theme.main_white};
  background-size: cover;
  &:hover {
    cursor: pointer;
    transform: translateY(-12px);
    transition: all 200ms ease;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px 0px;
  }
`;

const Box1 = styled.img`
  width: 100%;
  height: 100px;
  min-height: 167px;
  max-height: 180px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
  background-image: url("${(props) => props.src}");
`;

const Box2 = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  padding: 0 0.5rem;
  margin: auto;
  background-color: ${(props) => props.theme.main_white};
  background-size: cover;
`;

const Box3 = styled.div`
  width: 100%;
  min-height: 45px;
  max-height: 50px;
  border-radius: 0px 0px 5px 5px;
  background-color: ${(props) => props.theme.main_white};
  background-size: cover;
  position: absolute;
  bottom: 0;
  display: absolute;
`;
export default Card;
