import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Content, Title } from "../elements/Common";
import Button from "../components/Button";
import moment from "moment";
import "moment/locale/ko";

export default function CommentItem(props) {
  const { commentId, createdAt, textContents, userDisplayName, userId } =
    props.content;
  useEffect(() => {}, []);

  return (
    <>
      <div>
        {textContents} <span>|{userDisplayName}</span>
        <span>|{moment(createdAt).format("YYYY년 MM월 DD일")}</span>
      </div>
    </>
  );
}
