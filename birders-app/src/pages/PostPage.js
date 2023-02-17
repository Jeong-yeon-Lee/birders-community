import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import {
  doc,
  FieldValue,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import { Content, Tag, Title } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";
import Comments from "../components/Comments";
import shortid from "shortid";
import SampleImg from "../images/bird_sample.jpg";

export default function PostPage() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;
  //console.log("user", user.email);
  const navigate = useNavigate();
  let params = useParams();
  // const navigate = useNavigate();
  const postId = params.id;
  const [post, setPost] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [inputComment, setInputComment] = useState("");

  const [isLike, setIsLike] = useState(false);

  //console.log(params.id);
  //console.log(post.comments);

  useEffect(() => {
    let res = {};

    const getPost = async (id) => {
      try {
        const docRef = doc(db, "posts", id);
        const dbPost = await getDoc(docRef);
        const res = dbPost.data();
        //setPost(res.post);
        setPost(res);
      } catch (error) {
        console.log(error);
      }
    };
    getPost(postId);
  }, [postComments, isLike]);

  const deletePost = async () => {
    const ok = window.confirm("게시글을 삭제하시겠습니까?");
    console.log(ok);
    if (ok) {
      const docRef = doc(db, "posts", postId);
      await deleteDoc(docRef)
        .then(() => {
          alert("삭제된 게시물입니다.");
          navigate("/");
        })
        .catch((error) => {
          console.log("문제가 발생했어요. 다시 시도해주세요");
        });
    }
  };
  const updateCommentPost = async (currentComments) => {
    const docRef = doc(db, "posts", postId);
    const data = { post };
    await updateDoc(docRef, { comments: [...currentComments] });
  };
  const updateLikePost = async (isLike) => {
    const docRef = doc(db, "posts", postId);
    const data = { post };
    const likes = isLike ? post.likes + 1 : post.likes - 1;
    await updateDoc(docRef, { likes: likes });
  };

  const edit = () => {
    console.log("edit");
  };

  const toggleLike = () => {
    console.log("like");
    updateLikePost(!isLike);
    setIsLike(!isLike);
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

  const processedText = post.textContents?.split("\n").map((line) => {
    let keyId = shortid.generate();
    return (
      <p key={keyId}>
        {line}
        <br />
      </p>
    );
  });

  const handleCommentSubmit = async (commentInput) => {
    console.log(commentInput, "submit");
    let commentId = shortid.generate();
    const newComment = {
      commentId: commentId,
      userDisplayName: user.displayName,
      textContents: commentInput,
      userId: user.email,
      createdAt: Date.now(),
      postId: postId,
    };
    //let postCopy = post;
    //여기 하는중,,,,,,,,
    // if (post.comments.length === 0 || !post.comments) {
    //   setPostComments([newComment]);
    // } else {
    //   setPostComments([...post.comments, newComment]);
    // }
    setPostComments([...post.comments, newComment]);

    updateCommentPost([...post.comments, newComment]).then(() => {}); //이렇게 안하면 왜 처음엔 빈것이 가는것...
    // postCopy.comments = [...post.comments, newComment];
    // setPost(postCopy);
  };
  //console.log("밖", postComments);
  //console.log("comments확인", post.comments);
  const onErrorImg = (e) => {
    e.target.src = SampleImg;
  };
  if (isLoggedIn) {
    return (
      <>
        <Content>
          <Link to={"/board"}>목록으로</Link>
          <PostContainer>
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostInfoWrapper>
                <Column>
                  <WrapperRow>
                    <UserProfileImg>
                      <img
                        src={user.photoURL}
                        alt="user profile"
                        onError={onErrorImg}
                      />
                    </UserProfileImg>
                    <div>{post.userDisplayName}</div>
                    <div>❇</div>
                    <div>
                      {moment(post.createdAt).format("YYYY년 MM월 DD일")}
                    </div>
                    <Tag size={"sm"} margin={"0 0 0 0.75rem"}>
                      #{convertCategory(post.categoryName)}
                    </Tag>
                  </WrapperRow>
                </Column>
                <Column>
                  <WrapperRow>
                    {post.userId === user.email && (
                      <div>
                        {/* <Button
                          _onClick={edit}
                          margin="0 0.25rem"
                          fontSize={"12px"}
                          padding={"0.25rem 0.5rem"}
                        >
                          수정
                        </Button> */}
                        <Button
                          _onClick={deletePost}
                          margin="0 1rem 0 0.25rem"
                          fontSize={"12px"}
                          padding={"0.25rem 0.5rem"}
                        >
                          삭제
                        </Button>
                      </div>
                    )}

                    <Like onClick={toggleLike} is_like={isLike}>
                      {post.likes} ♥︎ liked
                    </Like>
                  </WrapperRow>
                </Column>
              </PostInfoWrapper>
            </PostHeader>
            <PostContent>{processedText}</PostContent>
            <Comments
              comments={post.comments?.length > 0 ? post.comments : []}
              updateComment={handleCommentSubmit}
            />
          </PostContainer>
        </Content>
      </>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}
const UserProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5rem;
  & img {
    width: 100%;
    object-fit: cover;
  }
`;
const PostHeader = styled.div`
  padding-bottom: 1rem;
`;
const PostContent = styled.div`
  border-top: 2px solid #4d9a8f;
  padding: 1rem;
  border-bottom: 2px solid #4d9a8f;
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

const PostInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;
const Column = styled.div``;
const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
const WrapperRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WrapperCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Like = styled.button`
  border: 1px solid #006e5f;
  padding: 0.25rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 14px;
  color: #006e5f;
  cursor: pointer;
  justify-content: space-between;

  ${(props) =>
    props.is_like
      ? `background-color:#006e5f; border-color:#006e5f; color:white;`
      : `background-color: #ffffff; border-color:#006e5f; color:006e5f;`};
  background-color: ${(props) => (props.is_like ? "#006e5f" : "white")};
`;

const PostContainer = styled.div`
  margin: 1rem 0;
`;
