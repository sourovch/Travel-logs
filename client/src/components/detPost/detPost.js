import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './style.module.css';

export default function DetPost() {
  const { logId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/logs/' + logId).then((res) => {
      setData(res.data);
    });
  }, [logId]);

  return data ? (
    <div>
      <h1 className={style.heading}>{data.heading}</h1>
      <p className={`${style.visitDate}`}>
        Visit Date: {new Date(data.visitDate).toDateString()}
      </p>
      <p className={`${style.exp} ${style.para}`}>{data.exp}</p>
      <h1 className={`${style.heading} ${style.gallery}`}>
        Photo Gallery
      </h1>
      <div className={`${style.photoWrapper}`}>
        {data.photos.map((i, index) => {
          return (
            <img
              src={i.fileUrl}
              alt={`featured${index}`}
              key={i.fileName}
            />
          );
        })}
      </div>
      <p className={`${style.name}`}>Posted By: {data.visitorName}</p>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
