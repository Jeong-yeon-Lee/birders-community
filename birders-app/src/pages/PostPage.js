import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, FieldValue, getDoc, updateDoc } from "firebase/firestore";
import { useParams, Navigate, Link } from "react-router-dom";
import { Content, Tag, Title } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";
import Comments from "../components/Comments";
import shortid from "shortid";

export default function PostPage() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;
  //console.log("user", user.email);

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
        setPost(res.post);
      } catch (error) {
        console.log(error);
      }
    };
    getPost(postId);
  }, []);

  const updatePost = async (currentComments) => {
    const docRef = doc(db, "posts", postId);
    //comment만 추가하는게 잘 안되어서 post 통째로 update...
    const data = { post };
    //await db.doc(`posts/${postId}`).update({ comments: [currentComments] });
    await updateDoc(docRef, data)
      .then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch((error) => {
        console.log(error);
      });
    // await docRef.update({
    //   comments: FieldValue.arrayUnion(...currentComments),
    // });
  };

  const edit = () => {
    console.log("edit");
  };

  const toggleLike = () => {
    console.log("like");
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

  const handleCommentSubmit = (commentInput) => {
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
    let postCopy = post;
    //여기 하는중,,,,,,,,
    // if (post.comments.length === 0 || !post.comments) {
    //   setPostComments([newComment]);
    // } else {
    //   setPostComments([...post.comments, newComment]);
    // }
    setPostComments([...post.comments, newComment]);
    postCopy.comments = [...post.comments, newComment];
    updatePost([...post.comments, newComment]); //이렇게 안하면 왜 처음엔 빈것이 가는것...
    setPost(postCopy);
  };
  //console.log("밖", postComments);
  //console.log("comments확인", post.comments);
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
                    <Tag size={"sm"}>#{convertCategory(post.categoryName)}</Tag>
                    <div>{post.userDisplayName}</div>
                    <div>❇</div>
                    <div>
                      {moment(post.createdAt).format("YYYY년 MM월 DD일")}
                    </div>
                  </WrapperRow>
                </Column>
                <Column>
                  <WrapperRow>
                    {post.userId === user.email && (
                      <div>
                        <Button
                          _onClick={edit}
                          margin="0 0.25rem"
                          fontSize={"12px"}
                          padding={"0.25rem 0.5rem"}
                        >
                          수정
                        </Button>
                        <Button
                          _onClick={edit}
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
    return <Navigate to="/login"></Navigate>;
  }
}

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
