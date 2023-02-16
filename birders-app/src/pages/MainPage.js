import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CarouselComponent from "../components/Banner";
import { Content, PageTitle } from "../elements/Common";
import Board from "../components/Board";
import Pagination from "../components/Pagination";

export default function MainPage() {
  const [posts, setPosts] = useState([]);

  //pagination
  const [pageLimit, setPageLimit] = useState(6);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    let res = [];
    const getPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const postsQuery = query(
        postsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(3)
      );
      const dbPosts = await getDocs(postsQuery);
      dbPosts.forEach((doc) => {
        //console.log("doc", doc);
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
          limit={pageLimit}
          pageNum={pageNum}
          setPage={handlePageChange}
        />
      </Content>
    </>
  );
}
