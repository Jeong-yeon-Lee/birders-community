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
  //let postsQuery;

  const getPosts = async () => {
    let res = [];
    //console.log("여기", lastDoc);
    let postsQuery = query(
      postsCollectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(3)
    );
    if (currentCategory.tabName !== "all") {
      postsQuery = query(
        postsCollectionRef,
        where("categoryName", "==", currentCategory.tabName),
        orderBy("createdAt", "desc")
        // startAfter(lastDoc),
        // limit(3)
      );
    }
    //console.log(currentCategory.tabName);
    // if (currentCategory.tabName !== "all") {
    //   // const countSnap = await getDocs(categoryCountQuery);
    //   //console.log(countSnap.size);
    //   // setPostsCount(countSnap.size);
    //   console.log("all이 아님");
    //   //postsCollectionRef = collection(db, "posts");
    //   console.log("postsCollectionRef:", postsCollectionRef);
    //   console.log("currentCategory.tabName:", currentCategory.tabName);
    //   postsQuery = query(
    //     postsCollectionRef,
    //     where("categoryName", "==", currentCategory.tabName),
    //     orderBy("createdAt", "desc")
    //     // startAfter(lastDoc),
    //     // limit(3)
    //   );
    // }
    const dbPosts = await getDocs(postsQuery);

    dbPosts.forEach((doc) => {
      const postObject = {
        ...doc.data(),
        id: doc.id,
      };
      res.push(postObject);
      setPosts([...res]);
    });

    if (currentCategory.tabName !== "all") {
      handlePageChange(1);
      //setPageNum(1);
      //querySnapshot = await getDocs(postsOrderBy);
      //setLastDoc(dbPosts.docs[-1]);
    }
  };

  const getSearchedPosts = async (searchTxt) => {
    let res = [];
    setCurrentCategory({
      tabNum: 0,
      tabName: "all",
      displayName: "전체",
    });
    console.log(searchTxt, typeof searchTxt);
    const postsSearchQuery = query(
      postsCollectionRef,
      where("title", "==", searchTxt),
      orderBy("createdAt", "desc")
    );
    const dbPosts = await getDocs(postsSearchQuery);
    // console.log(dbPosts.size);
    if (dbPosts.size > 0) {
      dbPosts.forEach((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        res.push(postObject);
        setPosts([...res]);
      });
    } else {
      setPosts([]);
    }

    // if (dbPosts.length > 0) {
    //   dbPosts.forEach((doc) => {
    //     const postObject = {
    //       ...doc.data(),
    //       id: doc.id,
    //     };
    //     res.push(postObject);
    //     setPosts([...res]);
    //   });
    // } else {
    //   setPosts([]);
    // }
  };

  const getPostsCount = async () => {
    querySnapshot = await getDocs(postsOrderBy);

    setPostsCount(querySnapshot.size);
  };

  useEffect(() => {
    //let res = [];
    getPostsCount();
    getPosts();
  }, []);

  useEffect(() => {
    //let res = [];
    //let q = currentCategory.tabName === "all" ? "default" : "category";
    //getPostsCount(q);
    getPosts();
  }, [lastDoc, pageNum]);

  const handleCategoryChange = async (obj) => {
    setCurrentCategory({
      ...currentCategory,
      tabNum: obj.tabNum,
      tabName: obj.tabName,
      displayName: obj.displayName,
    });
    if (obj.tabName !== "all") {
      setPageNum(0);
    }
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
    if (searchInput.trim().length > 0) {
      getSearchedPosts(searchInput);
    } else {
      getPosts();
    }
  };

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
          {posts?.length > 0 ? (
            <Board
              posts={posts}
              currentCategoryName={currentCategory.tabName}
            />
          ) : (
            <div>게시글이 없어요</div>
          )}
        </ListContainer>
        {searchText.trim().length === 0 && (
          <Pagination
            total={postsCount}
            limit={pageLimit}
            pageNum={pageNum}
            setPage={handlePageChange}
          />
        )}
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
