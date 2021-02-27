import React, { useState, useEffect } from 'react';
import { ImageGrid } from './../components/';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';
import { RootState } from '../store';



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