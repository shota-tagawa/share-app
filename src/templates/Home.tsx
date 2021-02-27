import React, { useState, useEffect } from 'react';
import { ImageGrid } from './../components/';
import { db } from '../firebase';



const Home = () => {
  const [postDatas, setPostDatas] = useState<any>([]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').get()
      .then((snapshot) => {
        const newpostDatas: any[] = [];
        snapshot.forEach((post) => {
          newpostDatas.push(post.data());
        })
        setPostDatas(newpostDatas);
      })
  }, [])

  return (
    <>
      <ImageGrid postDatas={postDatas} />
    </>
  )
}

export default Home;