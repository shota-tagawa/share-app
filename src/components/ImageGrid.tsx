import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styles from './../assets/imageGrid.module.scss';
import dummyImage from '../assets/imgs/dummy.jpg';

type Props = {
  postDatas: any;
}

const ImageGrid = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.grid}>
        {props.postDatas.map((imgData: any, key: number) => (
          <img
            key={key}
            src={imgData.url}
            alt=""
            className={styles.col}
            onClick={()=>dispatch(push(`/post/${imgData.id}`))}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGrid;