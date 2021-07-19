import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';
import PostForm from './Containers/MyBlog/PostForm';
import MyBlog from './Containers/MyBlog/index';

export default function App() {
  const [showAddNew, setshowAddNew] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(true);
  const [editData, setEditData] = useState(true);

  function addNewPost(flag) {
    //show the add post form and handle saving of post
    setshowAddNew(flag);
    setShowAllPosts(!flag);
  }

  function EditPost(data) {
    console.log(data);
    setEditData(data);
    setshowAddNew(true);
    setShowAllPosts(false);
  }

  function goHome() {
    setshowAddNew(false);
    setShowAllPosts(true);
  }

  return (
    <div>
      <h1 class="title" onClick={goHome}>
        My Blog
      </h1>
      {showAllPosts && (
        <MyBlog handleAddNew={addNewPost} handleEdit={EditPost} />
      )}
      {showAddNew && <PostForm editData={editData} />}
      <ToastContainer closeButton={true} position="top-center" />
    </div>
  );
}
