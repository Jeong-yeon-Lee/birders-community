import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Navigate } from "react-router-dom";
import { Content, Tag, Title } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";
import Comments from "../components/Comments";

export default function PostPage() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;

  let params = useParams();
  // const navigate = useNavigate();
  const postId = params.id;
  const [post, setPost] = useState({});
  //console.log(params.id);
  //console.log(post.comments);

  useEffect(() => {
    let res = {};

    const getPost = async (id) => {
      try {
        const docRef = doc(db, "posts", id);
        const dbPost = await getDoc(docRef);
        const res = dbPost.data();
        setPost(res.post);
      } catch (error) {
        console.log(error);
      }
    };
    getPost(postId);
  }, []);

  const edit = () => {
    console.log("edit");
  };
  const toggleLike = () => {
    console.log("like");
  };

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
  if (isLoggedIn) {
    return (
      <>
        <Content>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <div>{moment(post.createdAt).format("YYYY년 MM월 DD일")}</div>
            <div>{post.userDisplayName}</div>
            <div>{post.likes} ♥︎ liked</div>
            <Tag>#{convertCategory(post.categoryName)}</Tag>
            <Button _onClick={toggleLike} margin="0.5rem auto">
              좋아요
            </Button>
            <Button _onClick={edit} margin="0.5rem auto">
              수정
            </Button>
            <Button _onClick={edit} margin="0.5rem auto">
              삭제
            </Button>
          </PostHeader>
          <PostContent>
            <p>{post.textContents}</p>
          </PostContent>
          <Comments comments={post.comments ? post.comments : []} />
        </Content>
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

const PostHeader = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
`;
const PostContent = styled.div`
  padding: 0 1rem;
  margin-top: 1rem;
`;
const PostTitle = styled.h1`
  text-align: left;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-weight: 800;
  color: rgb(52, 58, 64);
  word-break: keep-all;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
