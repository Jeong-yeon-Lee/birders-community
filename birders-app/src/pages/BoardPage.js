import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function BoardPage() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  //const q = collection(db, "posts");

  useEffect(() => {
    let res = [];
    const getPosts = async () => {
      const dbPosts = await getDocs(postsCollectionRef);
      //const data = await getDocs(postsCollectionRef);
      console.log("dbpost", dbPosts);
      dbPosts.forEach((doc) => {
        console.log(doc);
        const postObject = {
          ...doc.data(),
          id: doc.id,
        };
        res.push(postObject);
        // setPosts((prev) => [postObject, ...prev]);
        //setPosts([...posts, postObject])//왜 안되지?
        setPosts([...res]);
      });
    };
    getPosts();
  }, []);

  console.log(posts);
  const result = posts.map((post) => (
    <Link to={`/post/${post.id}`} key={post.id}>
      {post.id}
    </Link>
  ));
  return <div>{posts.length > 0 && result}</div>;
}
