import React, { useState, useEffect } from "react";
// 파이어베이서 파일에서 import 해온 db
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);
  //const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const q = collection(db, "posts");
      const dbPosts = await getDocs(q);
      //const data = await getDocs(postsCollectionRef);
      console.log("dbpost", dbPosts);
      dbPosts.forEach((doc) => {
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        //setPosts((prev) => [postObject, ...prev]);
        setPosts((prev) => [postObject]);
      });
    };

    getPosts();
  }, []);

  console.log(posts);
  return <div>BoardPage</div>;
}
