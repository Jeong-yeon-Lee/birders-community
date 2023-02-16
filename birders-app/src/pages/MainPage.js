import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  count,
  onSnapshot,
  startAfter,
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
  const [postsCount, setPostsCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [pageNum, setPageNum] = useState(1);
  //const [offset, setOffset] = useState(0);
  //const offset = (pageNum - 1) * pageLimit;

  const [lastDoc, setLastDoc] = useState({});
  //const [firstDoc, setFirstDoc] = useState({});
  const postsCollectionRef = collection(db, "posts");
  let querySnapshot;
  const postsOrderBy = query(postsCollectionRef, orderBy("createdAt", "desc"));

  const getPosts = async () => {
    //console.log("야후");
    let res = [];

    const postsQuery = query(
      postsCollectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(3)
    );
    const dbPosts = await getDocs(postsQuery);
    dbPosts.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      res.push(postObject);

      setPosts([...res]);
      //console.log([...res]);
    });
  };

  const getPostsCount = async () => {
    //const snapshot = await postsCollectionRef.count().get();
    //console.log(snapshot.data().count);
    querySnapshot = await getDocs(postsOrderBy);
    //console.log(querySnapshot, "querysnap");
    setPostsCount(querySnapshot.size);
    //setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1].data());
  };

  useEffect(() => {
    //let res = [];
    getPostsCount();
    getPosts();
  }, []);

  useEffect(() => {
    //let res = [];
    getPosts();
  }, [lastDoc]);

  const handlePageChange = async (currentPageNum) => {
    //console.log(obj);//????
    setPageNum(currentPageNum);
    let offset = (currentPageNum - 1) * pageLimit;
    if (offset <= 0) {
      offset = 0;
    } else {
      offset = offset - 1;
    }
    //console.log(offset);
    querySnapshot = await getDocs(postsOrderBy);
    setLastDoc(querySnapshot.docs[offset]);
  };

  //console.log(lastDoc, "lastdoc");
  return (
    <>
      <CarouselComponent></CarouselComponent>
      <Content>
        <PageTitle>커뮤니티 최근 글</PageTitle>
        <Board currentCategoryName={"all"} posts={posts} />
        <Pagination
          total={postsCount}
          limit={pageLimit}
          pageNum={pageNum}
          setPage={handlePageChange}
        />
      </Content>
    </>
  );
}
