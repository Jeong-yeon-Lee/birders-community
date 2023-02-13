import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function PostPage() {
  let params = useParams();
  const [post, setPost] = useState({});
  console.log(params.id);

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
    getPost(params.id);
  }, []);

  return (
    <div>
      <div>{post.title}</div>
    </div>
  );
}
