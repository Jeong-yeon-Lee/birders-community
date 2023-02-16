import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/AuthProvider";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { Content, Tag, Title } from "../elements/Common";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function EditorPage() {
  const context = useContext(AuthContext);
  const { user, isLoggedIn, logIn, logOut } = context;
  //console.log(user);
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    inputTitle: "",
    inputTextContents: "",
    inputThumbnailSrc: "",
    inputCategoryName: "news",
    inputBirdList: [],
  });
  const [selected, setSelected] = useState("news");
  //커서 밖으로 안하면 onchange 안되는거 임시방편
  const [isReady, setIsReady] = useState(false);
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
    title: "",
    textContents: "",
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
    updatePost();
    setIsReady(false);
  };
  const handleChangeSelect = (e) => {
    //console.log(e.target.value); //ok
    setSelected(e.target.value);
    //console.log("selected", selected); //이전 값 나옴
    setUserInputs({ ...userInputs, inputCategoryName: e.target.value });
    //console.log(userInputs, selected, "select");
    updatePost();
    setIsReady(false);
  };
  //console.log("test", selected);
  //console.log("test", userInputs);
  //console.log(userInputs);
  const updatePost = () => {
    const {
      inputTitle,
      inputTextContents,
      inputBirdList,
      inputThumbnailSrc,
      inputCategoryName,
    } = userInputs;

    setPost({
      ...post,
      title: inputTitle,
      textContents: inputTextContents,
      createdAt: Date.now(),
      userId: user.email,
      userDisplayName: user.displayName,
      editedAt: Date.now(),
      comments: [],
      birdList: [],
      thumbnailSrc: `${
        inputThumbnailSrc.trim().length !== 0
          ? inputThumbnailSrc
          : "https://images.unsplash.com/photo-1521730365094-d6978fa2ac8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
      }`,
      likes: 0,
      categoryName: inputCategoryName,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInputs.inputTitle.trim().length === 0 ||
      userInputs.inputTextContents.trim().length === 0
    ) {
      return alert("제목 또는 내용이 없습니다");
    }

    await addDoc(collection(db, "posts"), {
      ...post,
    })
      .then(() => {
        alert("게시 완료!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("문제가 발생했어요. 다시 시도해주세요");
        navigate("/");
      });

    //console.log(post);
  };

  const readySubmit = () => {
    updatePost();
    setIsReady(true);
  };
  return (
    <Content>
      <form onSubmit={handleSubmit}>
        <EditorContainer>
          <EditorInput font_size={"24px"}>
            <input
              type="text"
              name="inputTitle"
              onChange={handleChange}
              value={userInputs.inputTitle}
              placeholder="제목을 입력하세요(필수)"
            />
          </EditorInput>
          <EditorInput font_size={"16px"}>
            <textarea
              type="text"
              name="inputTextContents"
              onChange={handleChange}
              value={userInputs.inputTextContents}
              placeholder="내용을 입력하세요(필수)"
            />
          </EditorInput>
          <EditorInput>
            <input
              type="text"
              name="inputThumbnailSrc"
              //onChange={handleChange}
              onInput={handleChange}
              value={userInputs.inputThumbnailSrc}
              placeholder="커버사진 URL을 입력하세요(선택)"
            />
          </EditorInput>
          <EditorInput>
            <select
              name="inputCategoryName"
              onChange={handleChangeSelect}
              //onInput={handleChangeSelect}
              value={selected}
            >
              <option value="news">#새소식</option>
              <option value="question">#새문답</option>
              <option value="fieldNote">#탐조기록</option>
            </select>
          </EditorInput>
          {isReady && (
            <EditorInput font_size={"18px"} bold>
              <input type="submit" value="게시" />
            </EditorInput>
          )}
        </EditorContainer>
      </form>
      {!isReady && (
        <EditorInput font_size={"18px"} bold>
          <input type="button" value="완료" onClick={readySubmit} />
        </EditorInput>
      )}
    </Content>
  );
}
const EditorContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const EditorInput = styled.div`
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
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: rgb(33, 37, 41);
    line-height: 1.75;
    height: 300px;
    &::placeholder {
      color: gray;
    }
  }
  & input {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 4px;
    border: 1px solid gray;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
  & input[type="submit"] {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 1px solid gray;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 4px;
    border: 0;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: white;
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
    cursor: pointer;
    background-color: #006e5f;
  }

  & input[type="button"] {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 4px;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: black;
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
    cursor: pointer;
    background-color: #d3dde4;
    border: 0;
  }

  & select {
    box-sizing: border-box;
    width: 100%;
    resize: none;
    padding: 0.5rem 0.75rem;
    outline: none;
    border: 1px solid gray;
    margin: 0 0.5rem 0.5rem 0;
    border-radius: 4px;
    min-height: 2rem;
    font-size: ${(props) => (props.font_size ? props.font_size : "14px")};
    color: rgb(33, 37, 41);
    line-height: 1.75;
    &::placeholder {
      color: gray;
    }
  }
`;
