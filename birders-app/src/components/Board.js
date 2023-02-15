import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import styled from "styled-components";
import CategoryTab from "../components/CategoryTab";
import { Content } from "../elements/Common";

export default function Board(props) {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const currentCategory = props.currentCategoryName;
  const currentPosts = props.posts;

  const filteredPosts = currentPosts?.filter(
    (p) => p.post.categoryName === currentCategory
  );

  const filteredResult = filteredPosts?.map((post) => (
    <Card post={post} key={post.id}></Card>
  ));
  const result = currentPosts.map((post) => (
    <Card post={post} key={post.id}></Card>
  ));
  if (currentCategory === "all") {
    return (
      <>
        <ListContainer>{currentPosts.length > 0 && result}</ListContainer>
      </>
    );
  } else {
    return (
      <>
        <ListContainer>
          {filteredPosts.length > 0 && filteredResult}
        </ListContainer>
      </>
    );
  }
}

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
