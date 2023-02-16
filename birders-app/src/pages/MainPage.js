import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CarouselComponent from "../components/Banner";
import { Content, PageTitle } from "../elements/Common";
import Board from "../components/Board";
import Pagination from "../components/Pagination";

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  //pagination
  const [limit, setLimit] = useState(6);
  const [pageNum, setPageNum] = useState(1);
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

        setPosts([...res]);
      });
    };
    getPosts();
  }, []);

  const handlePageChange = (currentPageNum) => {
    //console.log(obj);//????
    setPageNum(currentPageNum);
  };
  return (
    <>
      <CarouselComponent></CarouselComponent>
      <Content>
        <PageTitle>커뮤니티 최근 글</PageTitle>
        <Board currentCategoryName={"all"} posts={posts} />
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
