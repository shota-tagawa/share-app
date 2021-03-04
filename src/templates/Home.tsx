import React, { useState, useEffect } from 'react';
import { firebasePost } from '../interface';
import { ImageGrid } from './../components/';
import { db } from '../firebase';

const Home = () => {
  const [postDatas, setPostDatas] = useState<firebasePost[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();
      const newpostDatas: firebasePost[] = [];
      posts.forEach((post) => {
        newpostDatas.push(post.data() as firebasePost);
      })
      setPostDatas(newpostDatas);
    })();
  }, [])

  return (
    <>
      <ImageGrid postDatas={postDatas} />
    </>
  )
}

export default Home;