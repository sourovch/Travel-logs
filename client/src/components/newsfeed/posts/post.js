import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import style from './style.module.css';
import showPass from '../../../utils/showPass';

export default function Post({ post, update }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [authInput, setAuthInput] = useState(false);
  const [authData, setAuthData] = useState({});
  const [authError, setAuthError] = useState(false);
  const passRef = useRef();

  const handleDelete = (e) => {
    axios.delete(`/logs/${post._id}`).then((res) => {
      update();
      console.log('delated');
    });
  };

  const handleAuthData = (e) => {
    const input = e.target;
    const name = input.name;

    setAuthData({ ...authData, [name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`/auth`, {
        ...authData,
        id: post._id,
      })
      .then((res) => {
        if (res.status === 200) {
          setAuthError(false);
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
        setAuthError(true);
        setAuthInput(false);
      });
  };

  return (
    <div className={style.logCard}>
      <h1 className={style.logHeading}>{post.heading}</h1>
      <h4 className={style.visitorName}>{post.visitorName}</h4>
      <p className={style.expSum}>
        {post.expSummary} <Link to={`log/${post._id}`}>See More</Link>
      </p>
      <div className={`${style.grid} ${style.photos}`}>
        {post.photos.length > 0 &&
          post.photos.map((i, index) => {
            if (index < 4) {
              return (
                <div className={style.photoWrapper} key={i.fileName}>
                  <img
                    src={i.fileUrl}
                    alt="featured"
                    style={{ width: '100%' }}
                  />
                </div>
              );
            }
            return '';
          })}
      </div>
      <div className={style.flex}>
        {post.visitDate && (
          <p className={style.visitDate}>
            Visited On: {new Date(post.visitDate).toDateString()}
          </p>
        )}
        {auth ? (
          <div className={style.editBtn}>
            <button onClick={(e) => navigate(`editLog/${post._id}`)}>
              Edit
            </button>
            <button onClick={handleDelete}>Delate</button>
          </div>
        ) : !authInput ? (
          <>
            <button
              className={style.authBtn}
              onClick={(e) => {
                setAuthInput(true);
              }}
            >
              Autorize
            </button>
            {authError ? <p>wrong id or password</p> : ''}
          </>
        ) : (
          <form onSubmit={handleSubmit} className={style.authForm}>
            <label htmlFor="userName">User Name : </label>
            <input
              type="text"
              name="userName"
              id="userName"
              onChange={handleAuthData}
            />
            <br />
            <label htmlFor="editPassowrd">Pass: </label>
            <input
              type="password"
              name="editPassword"
              id="editPassword"
              ref={passRef}
              onChange={handleAuthData}
            />
            <i
              style={{ marginLeft: '-50px' }}
              onClick={(e) => showPass(e, passRef)}
            >
              Show
            </i>
            <br />
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={(e) => setAuthInput(false)}
            >
              Cancle
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
