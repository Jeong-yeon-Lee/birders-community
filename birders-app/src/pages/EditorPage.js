import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export default function EditorPage() {
  const [userInputs, setUserInputs] = useState({
    inputTitle: "",
    inputTextContents: "",
    inputThumbnailSrc: "",
    inputCategoryName: "",
    inputBirdList: [],
  });
  const [selected, setSelected] = useState("question");
  const comment = () => {
    return {
      commentId: `commentId$`,
      userDisplayName: `userDisplayName`,
      textContents: `textContents`,
      userId: `userId`,
      createdAt: Date.now(),
    };
  };
  const [post, setPost] = useState({
    title: `테스트 샘플타이틀`,
    textContents: `샘플 컨텐츠`,
    createdAt: Date.now(),
    userId: `sampleuser`,
    userDisplayName: `샘플 유저`,
    editedAt: Date.now(),
    thumbnailSrc: "",
    comments: [],
    birdList: [],
    categoryName: "news",
  });
  const handleChange = (e) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
    //console.log(userInputs, "input");
  };
  const handleChangeSelect = (e) => {
    //console.log(e.target.value); //ok
    setSelected(e.target.value);
    //console.log("selected", selected); //이전 값 나옴
    setUserInputs({ ...userInputs, inputCategoryName: e.target.value });
    //console.log(userInputs, selected, "select");
  };
  //console.log("test", selected);
  //console.log("test", userInputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      post,
    });

    setPost({
      ...post,
      title: `테스트 샘플타이틀`,
      textContents: `샘플 컨텐츠`,
      createdAt: Date.now(),
      userId: `sampleuser`,
      userDisplayName: `샘플 유저`,
      editedAt: Date.now(),
      comments: [],
      birdList: [],
      thumbnailSrc:
        "https://images.unsplash.com/photo-1521730365094-d6978fa2ac8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
      likes: 0,
      categoryName: "news",
    });
    //console.log(post);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="inputTitle"
        onChange={handleChange}
        value={userInputs.inputTitle}
        placeholder="제목을 입력하세요"
      />
      <input
        type="text"
        name="inputTextContents"
        onChange={handleChange}
        value={userInputs.inputTextContents}
        placeholder="내용을 입력하세요"
      />
      <select
        name="inputCategoryName"
        onChange={handleChangeSelect}
        value={selected}
      >
        <option value="news">새소식</option>
        <option value="question">새문답</option>
        <option value="fieldNote">탐조기록</option>
      </select>

      <input type="submit" value="게시" />
    </form>
  );
}
