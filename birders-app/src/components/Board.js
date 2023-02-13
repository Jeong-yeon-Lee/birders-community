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
  console.log(currentCategory, "props");

  useEffect(() => {
    let res = [];
    const getPosts = async () => {
      const dbPosts = await getDocs(postsCollectionRef);
      //const data = await getDocs(postsCollectionRef);
      //console.log("dbpost", dbPosts);
      dbPosts.forEach((doc) => {
        //console.log(doc);
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        res.push(postObject);
        // setPosts((prev) => [postObject, ...prev]);
        //setPosts([...posts, postObject])//왜 안되지?
        setPosts([...res]);
      });
    };
    getPosts();
  }, []);

  //console.log(posts);
  const filteredPosts = posts.filter(
    (p) => p.post.categoryName === currentCategory
  );
  //console.log(filteredPosts);
  //console.log(posts[0].post.categoryName);
  const filteredResult = filteredPosts.map((post) => (
    <Card post={post} key={post.id}></Card>
  ));
  const result = posts.map((post) => <Card post={post} key={post.id}></Card>);
  if (currentCategory === "all") {
    return (
      <>
        <ListContainer>{posts.length > 0 && result}</ListContainer>
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
