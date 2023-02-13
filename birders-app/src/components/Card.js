import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Grid from "../elements/Grid";
import { Text } from "../elements/Common";
import SampleImg from "../images/bird_sample.jpg";
import { Link } from "react-router-dom";
const Card = (props) => {
  // console.log(props);
  const { id, post } = props.post;
  const postCreateAt = new Date(post.createdAt).toLocaleString();

  return (
    <>
      <CardContainer>
        <Box1
          src={post.thumbnailSrc ? post.thumbnailSrc : SampleImg}
          onClick={() => {
            console.log("이미지클릭");
          }}
        />
        <Box2>
          <Grid padding="0.25rem" left>
            <Text bold size="16px">
              <StyledPostTitleLink to={`/post/${id}`} key={id}>
                {post.title}
              </StyledPostTitleLink>
            </Text>
            <Text size="14px"> {post.textContents}</Text>
            <Text size="14px" color="#006e5f">
              #{post.categoryName}
            </Text>
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
    </>
  );
};

const StyledPostTitleLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  color: black;
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
