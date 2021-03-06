import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';

import './style.css';

export default function PostForm(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.editData.data) {
      setTitle(props.editData.data.title);
      setText(props.editData.data.text);
      setIsEdit(true);
    }
  }, []);

  function handleTitleChange() {
    setTitle(event.target.value);
  }

  function handleTextChange() {
    setText(event.target.value);
  }

  //function to handle save of post
  function handleSave() {
    setLoading(true);
    //console.log(props.editData.data.id);
    let formData = {
      title,
      text
    };
    console.log(formData);
    axios
      .post(
        `https://salesforce-blogs.herokuapp.com/blogs/api/${
          isEdit ? props.editData.data.id : ''
        }`,
        formData
      )
      .then(response => {
        toast.success('Post saved successfully.');
        setLoading(false);
      })
      .catch(err => {
        toast.error('Cannot save post, some error occured' + err);
        console.log('Cannot save post, some error occured' + err);
        setLoading(false);
      });
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <h2>{isEdit ? 'Edit Post' : 'New Post'}</h2>
      <div class="postform">
        <div class="postfield">
          <span>TITLE:</span>
          <input
            type="text"
            defaultValue={title}
            onChange={handleTitleChange}
          />
        </div>
        <div class="postfield">
          <span>TEXT:</span>
          <textarea onChange={handleTextChange} defaultValue={text} rows="5" />
        </div>
        <div class="postfield">
          <input
            type="button"
            value="Save"
            class="saveButton"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
