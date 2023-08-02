import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EdImage } from './edimage';

export default function EditForm() {
  const { logId } = useParams();
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    expSummary: '',
    exp: '',
    visitDate: '',
    photos: [],
  });
  const [delateList, setDelateList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios('/logs/' + logId).then((res) => {
      setData(res.data);
    });
  }, [logId]);

  useEffect(() => {
    if (!!data) {
      setFormData((v) => {
        return {
          ...v,
          heading: data.heading,
          expSummary: data.expSummary,
          exp: data.exp,
          visitDate: data.visitDate,
        };
      });
    }
  }, [data]);

  function addToDelateList(fileName = '') {
    setDelateList((v) => [...v, fileName]);
  }

  function textChangeHandler(e) {
    const input = e.target;
    const name = input.name;

    setFormData((v) => {
      return { ...v, [name]: input.value };
    });
  }

  function photoChangeHandler(e) {
    const photos = e.target.files;

    setFormData({ ...formData, photos });
  }

  function cancleHandler(e) {
    navigate('/');
  }

  function submitHandler(e) {
    e.preventDefault();

    const form = new FormData();

    delateList.forEach((i) => {
      form.append('delateList', i);
    });

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
      .put('/logs/' + data._id, form)
      .then((res) => {
        navigate('/');
        console.log('done');
      })
      .catch((err) => console.log(err));
  }

  return data ? (
    <div className="container">
      <form onSubmit={submitHandler} className="logForm">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="heading"
          id="title"
          value={formData.heading}
          onChange={textChangeHandler}
          maxlength="50"
        />
        <br />
        <label htmlFor="expSummary">Exp Summary: </label>
        <textarea
          id="expSummary"
          name="expSummary"
          value={formData.expSummary}
          onChange={textChangeHandler}
        />
        <br />
        <label htmlFor="exp">Exp: </label>
        <textarea
          id="exp"
          name="exp"
          value={formData.exp}
          onChange={textChangeHandler}
        />
        <br />
        <label htmlFor="visitDate">Visit Date: </label>
        <input
          type="date"
          name="visitDate"
          id="visitDate"
          onChange={textChangeHandler}
        />
        <br />
        <label htmlFor="files">Add Photos: </label>
        <input
          multiple
          type="file"
          id="files"
          onChange={photoChangeHandler}
        />
        <div>
          {data.photos.map((i) => (
            <EdImage
              image={i}
              key={i.fileName}
              delate={addToDelateList}
            />
          ))}
        </div>
        <button type="submit">Save</button>
        <button onClick={cancleHandler}>Cancle</button>
      </form>
    </div>
  ) : (
    <h2>loading</h2>
  );
}
