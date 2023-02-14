import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Content, Title, Text } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";

export default function CommentItem(props) {
  const { commentId, createdAt, textContents, userDisplayName, userId } =
    props.content;
  const listOrder = props.order;
  useEffect(() => {}, []);

  return (
    <>
      <CommentItemContainer>
        <Row>
          {listOrder}. {textContents}
        </Row>
        <Row padding={"0 1rem"}>
          <Text color="gray" margin="0">
            {userDisplayName}{" "}
            {moment(createdAt).format("YYYY년 MM월 DD일 hh:mm:ss")}
          </Text>
        </Row>
      </CommentItemContainer>
    </>
  );
}

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  justify-content: start;
  border-bottom: 1px solid #cce2df;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const Row = styled.div`
  padding: ${(props) => (props.padding ? props.padding : "0")};
`;
