import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function EditorPage() {
  const [num, setNum] = useState(0);

  const comment = (num) => {
    return {
      commentId: `commentId${num}`,
      userDisplayName: `userDisplayName${num}`,
      textContents: `textContents${num}`,
      userId: `userId${num}`,
    };
  };
  const [post, setPost] = useState({
    title: `테스트 샘플타이틀${num}`,
    textContents: `샘플 컨텐츠${num}`,
    createdAt: Date.now(),
    userId: `sampleuser${num}`,
    userDisplayName: `샘플 유저${num}`,
    editedAt: Date.now(),
    comments: comment(num),
    birdList: ["참새", "까치"],
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      post,
    });
    setNum(num + 1);
    setPost({
      ...post,
      title: `테스트 샘플타이틀${num}`,
      textContents: `샘플 컨텐츠${num}`,
      createdAt: Date.now(),
      userId: `sampleuser${num}`,
      userDisplayName: `샘플 유저${num}`,
      editedAt: Date.now(),
      comments: comment(num),
      birdList: ["참새", "까치"],
      thumbnailSrc:
        "https://images.unsplash.com/photo-1521730365094-d6978fa2ac8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
      likes: 0,
    });
    //console.log(post);
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="submit" value="테스트" />
    </form>
  );
}
