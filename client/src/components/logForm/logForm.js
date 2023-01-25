import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';
import showPass from '../../utils/showPass';

export default function LogForm() {
  const [formData, setFormData] = useState({
    visitorName: 'Anonymous',
    heading: '',
    expSummary: '',
    exp: '',
    visitDate: '',
    photos: [],
    userName: '',
    editPassword: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const passRef = useRef();

  useEffect(() => {
    if (
      formData.heading.length > 0 &&
      formData.exp.length > 0 &&
      formData.visitDate.length > 0
    ) {
      if (formData.expSummary.length <= 0)
        formData.expSummary = `${formData.exp.substring(0, 100)}....`;

      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const textChangeHandler = (e) => {
    const elem = e.target;
    const name = elem.name;

    if (elem.classList.contains(style.formDataInvalid))
      elem.classList.remove(style.formDataInvalid);

    setFormData({ ...formData, [name]: e.target.value });
  };

  const invalidSubmitHandler = (e) => {
    const form = e.target.parentNode;
    const reqFilds = ['heading', 'exp', 'visitDate'];

    reqFilds.forEach((i) => {
      const element = form.elements[i];
      if (element.value.length <= 0)
        element.classList.add(style.formDataInvalid);
    });
  };

  const photoSelecHandler = (e) => {
    const files = e.target.files;

    setFormData({ ...formData, photos: files });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photos') {
        for (let i = 0; i < value.length; i++) {
          form.append('files', value[i]);
        }
        return;
      }
      form.append(key, value);
    });

    axios
      .post('/logs/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => navigate('/'))
      .catch((err) => {
        setIsError(true);
        console.log(err.message);
      });
  };

  const cancleHandler = (e) => {
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="logForm">
        <label htmlFor="visitorName">Name: </label>
        <input
          id="visitorName"
          name="visitorName"
          type="text"
          placeholder="Enter your name"
          onChange={textChangeHandler}
        />{' '}
        <span>*Optional</span>
        <br />
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          name="heading"
          type="text"
          placeholder="Write a Title Sentance"
          onChange={textChangeHandler}
          maxlength="50"
        />
        <br />
        <label htmlFor="expSum">Summary: </label>
        <textarea
          id="expSum"
          style={{ resize: 'none' }}
          name="expSummary"
          placeholder="write a short Summary of your Travel"
          onChange={textChangeHandler}
        />{' '}
        <span>*Optional</span>
        <br />
        <label htmlFor="expDet">Experiance: </label>
        <textarea
          id="expDet"
          style={{ resize: 'none' }}
          name="exp"
          placeholder="write about your experiance"
          onChange={textChangeHandler}
        />
        <br />
        <label htmlFor="visitDate">Visit Date: </label>
        <input
          name="visitDate"
          type="date"
          onChange={textChangeHandler}
        />
        <br />
        <label htmlFor="images">Add images: </label>
        <input
          multiple
          type="file"
          accept="image/*"
          name="images"
          onChange={photoSelecHandler}
        />
        <div>
          <p htmlFor="editInfo">
            if you want to edit of find the post by searching you can
            add an uniqueName and password <span>*Optional</span>
          </p>
          <label htmlFor="editName">Unique Name: </label>
          <input
            name="userName"
            type="text"
            id="editName"
            placeholder="eg: @uniqeName"
            onChange={textChangeHandler}
          />
          <br />
          <label htmlFor="editPass">Password</label>
          <input
            type="password"
            id="editPass"
            name="editPassword"
            ref={passRef}
            onChange={textChangeHandler}
          />
          <i
            style={{ marginLeft: '-60px' }}
            onClick={(e) => showPass(e, passRef)}
          >
            Show
          </i>
        </div>
        <br />
        {isError ? <p>An error ocourd</p> : ''}
        {isValid ? (
          <button type="submit">Log Travel</button>
        ) : (
          <button type="button" onClick={invalidSubmitHandler}>
            Log Travel
          </button>
        )}
        <button onClick={cancleHandler}>Cancle</button>
      </form>
    </div>
  );
}
