import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Content, Title } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";
import CommentItem from "./CommentItem";

export default function Comments(props) {
  const currentComments = props.comments;
  //console.log(currentComments, "comments");
  const result = currentComments.map((c) => (
    <CommentItem content={c} key={c.commentId} />
  ));
  useEffect(() => {}, []);

  return (
    <>
      <CommentContainer>
        <h3>{currentComments.length}개의 댓글</h3>
        <CommentInput>
          <textarea placeholder="댓글을 작성하세요"></textarea>
          <div>
            <Button>작성</Button>
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

  align-items: flex-start;

  & textarea {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 1rem 1rem 1.5rem;
    outline: none;
    border: 1px solid gray;
    margin-bottom: 1rem;
    border-radius: 4px;
    min-height: 6.125rem;
    font-size: 1rem;
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
`;
