import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Content, Title, Text } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";
import CommentItem from "./CommentItem";

export default function Comments(props) {
  const [commentInput, setCommentInput] = useState("");
  const currentComments = props.comments;
  //console.log(currentComments, "comments");
  let listOrder = 1;
  const result = currentComments.map((c) => (
    <CommentItem content={c} key={c.commentId} order={listOrder++} />
  ));

  useEffect(() => {}, []);
  const handleChange = (e) => {
    setCommentInput(e.target.value);
    console.log(commentInput);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`${commentInput}`);
  };
  return (
    <>
      <CommentContainer>
        <Text color={"#006e5f"} size={"18px"} bold>
          {currentComments.length}개의 댓글
        </Text>
        <CommentInput>
          <textarea
            placeholder="댓글을 작성하세요"
            value={commentInput}
            name="commentText"
            onChange={handleChange}
          ></textarea>
          <div>
            <Button type="submit" _onClick={handleSubmit}>
              작성
            </Button>
          </div>
        </CommentInput>
        {currentComments.length > 0 && result}
      </CommentContainer>
    </>
  );
}

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const CommentInput = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;

  & textarea {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 1px solid gray;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 4px;
    min-height: 2rem;
    font-size: 1rem;
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
`;
