import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './style.module.css';

import { useForceUpdate } from '../../hooks/forceUpdate';
import { Post } from './posts';

export default function NewsFeed() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [update, value] = useForceUpdate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios('/logs')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setLoading(false);
      });
  }, [value]);
  return loading ? (
    <div className={style.errWrapper}>loading</div>
  ) : !err ? (
    <div>
      {data.map((i) => (
        <Post post={i} key={i._id} update={update} />
      ))}
    </div>
  ) : (
    <div className={style.errWrapper}>{err.message}</div>
  );
}
