import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import styled from "styled-components";
import CategoryTab from "../components/CategoryTab";
import { Content, PageTitle } from "../elements/Common";
import Board from "../components/Board";
import Pagination from "../components/Pagination";

export default function BoardPage() {
  //const [posts, setPosts] = useState([]);
  //const postsCollectionRef = collection(db, "posts");
  //pagination
  const [limit, setLimit] = useState(6);
  const [pageNum, setPageNum] = useState(1);

  const [currentCategory, setCurrentCategory] = useState({
    tabNum: 0,
    tabName: "all",
    displayName: "전체",
  });

  // useEffect(() => {
  //   let res = [];
  //   const getPosts = async () => {
  //     const dbPosts = await getDocs(postsCollectionRef);
  //     //const data = await getDocs(postsCollectionRef);
  //     //console.log("dbpost", dbPosts);
  //     dbPosts.forEach((doc) => {
  //       //console.log(doc);
  //       const postObject = {
  //         ...doc.data(),
  //         id: doc.id,
  //       };
  //       res.push(postObject);
  //       // setPosts((prev) => [postObject, ...prev]);
  //       //setPosts([...posts, postObject])//왜 안되지?
  //       setPosts([...res]);
  //     });
  //   };
  //   getPosts();
  // }, []);

  const handleCategoryChange = (obj) => {
    setCurrentCategory({
      ...currentCategory,
      tabNum: obj.tabNum,
      tabName: obj.tabName,
      displayName: obj.displayName,
    });
    //console.log(currentCategory, "board");
  };

  const handlePageChange = (currentPageNum) => {
    //console.log(obj);//????
    setPageNum(currentPageNum);
  };
  //console.log(posts);
  //const result = posts.map((post) => <Card post={post} key={post.id}></Card>);
  return (
    <>
      <Content>
        <PageTitle>커뮤니티 </PageTitle>
        <CategoryTab
          tabNum={currentCategory.tabNum}
          displayName={currentCategory.tabName}
          onCategoryChange={handleCategoryChange}
        />
        <ListContainer>
          <Board currentCategoryName={currentCategory.tabName} />
        </ListContainer>
        <Pagination
          total={30}
          limit={limit}
          pageNum={pageNum}
          setPage={handlePageChange}
        />
      </Content>
    </>
  );
}

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
