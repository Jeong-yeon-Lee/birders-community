import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../components/AuthProvider";
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
  where,
} from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import Card from "../components/Card";
import styled from "styled-components";
import CategoryTab from "../components/CategoryTab";
import { Content, PageTitle } from "../elements/Common";
import Board from "../components/Board";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default function BoardPage() {
  const context = useContext(AuthContext);
  const { isLoggedIn } = context;

  const [posts, setPosts] = useState([]);

  //pagination
  const [postsCount, setPostsCount] = useState(0);
  const [pageLimit, setPageLimit] = useState(3);
  const [pageNum, setPageNum] = useState(1);
  const [lastDoc, setLastDoc] = useState({});

  const postsCollectionRef = collection(db, "posts");
  let querySnapshot;
  const postsOrderBy = query(postsCollectionRef, orderBy("createdAt", "desc"));
  let postsBySearchText;
  //category
  const [currentCategory, setCurrentCategory] = useState({
    tabNum: 0,
    tabName: "all",
    displayName: "전체",
  });
  //search
  const [searchText, setSearchText] = useState("");

  const getPosts = async () => {
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
    });
  };

  const getSearchedPosts = async () => {
    let res = [];

    const postsQuery = query(
      postsBySearchText,
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
    });
  };

  const getPostsCount = async (queryType) => {
    console.log(queryType);
    if (queryType === "default") {
      querySnapshot = await getDocs(postsOrderBy);
    } else if (queryType === "search") {
      querySnapshot = await getDocs(postsBySearchText);
    }

    setPostsCount(querySnapshot.size);
  };

  useEffect(() => {
    //let res = [];
    getPostsCount("default");
    getPosts();
  }, []);

  useEffect(() => {
    //let res = [];
    getPostsCount("search");
    getPosts();
  }, [searchText]);

  useEffect(() => {
    //let res = [];
    getPosts();
  }, [lastDoc]);

  const handleCategoryChange = (obj) => {
    setCurrentCategory({
      ...currentCategory,
      tabNum: obj.tabNum,
      tabName: obj.tabName,
      displayName: obj.displayName,
    });
    //console.log(currentCategory, "board");
  };

  const handlePageChange = async (currentPageNum) => {
    setPageNum(currentPageNum);
    let offset = (currentPageNum - 1) * pageLimit;
    if (offset <= 0) {
      offset = 0;
    } else {
      offset = offset - 1;
    }
    querySnapshot = await getDocs(postsOrderBy);
    setLastDoc(querySnapshot.docs[offset]);
  };
  const handlePostsSearch = (searchInput) => {
    setSearchText(searchInput);
    postsBySearchText = query(
      postsCollectionRef,
      where("title", "in", [searchInput])
    );
  };
  useEffect(() => {
    if (searchText.trim().length !== 0) {
      //postsBySearchText= query(postsCollectionRef, where('title','in',searchInput));
    }
  }, [searchText]);

  return (
    <>
      <Content>
        <PageTitle>커뮤니티 </PageTitle>
        <CategoryTab
          tabNum={currentCategory.tabNum}
          displayName={currentCategory.tabName}
          onCategoryChange={handleCategoryChange}
        />
        <Search onSearch={handlePostsSearch} />
        <ListContainer>
          <Board posts={posts} currentCategoryName={currentCategory.tabName} />
        </ListContainer>
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

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
