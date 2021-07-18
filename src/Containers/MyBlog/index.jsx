import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style.css';

export default function MyBlog(props) {
  const [allposts, setAllPosts] = useState([]);
  useEffect(() => {
    loadAllPosts();
  }, []);

  function loadAllPosts() {
    //load all posts data
    axios
      .get('https://salesforce-blogs.herokuapp.com/blogs/api/')
      .then(resp => {
        setAllPosts(resp.data);
        toast('Fetched all poasts successfullt');
      })
      .catch(err => {
        console.log('Error Occured' + err);
      });
  }

  //handle rerender on changes in list of posts
  useEffect(() => {
    console.log('All Posts loaded successfully!');
  }, [allposts]);

  //edit post
  function editPost(index) {
    axios
      .get(`https://salesforce-blogs.herokuapp.com/blogs/api/${index}`)
      .then(response => {
        console.log('fetched post successfully ');
        props.handleEdit(response);
      })
      .catch(err => {
        console.log('Cannot delete post, some error occured' + err);
      });
  }

  //delete post
  function deletePost(index) {
    axios
      .delete(`https://salesforce-blogs.herokuapp.com/blogs/api/${index}`)
      .then(response => {
        console.log('deleted successfully ');
        loadAllPosts();
      })
      .catch(err => {
        console.log('Cannot delete post, some error occured' + err);
      });
  }

  //add new post
  function handleAddNewPost() {
    console.log(props);
    props.handleAddNew(true);
  }

  return (
    <div class="myblog">
      <div class="pastposts">
        {allposts &&
          allposts.map((post, index) => {
            return (
              <div class="postnav" key={post.id}>
                <h3>Post {post.id}</h3>
                <h3>{moment(post.timestamp).format('MMMM Do YYYY')}</h3>
              </div>
            );
          })}
        <div>
          <input
            type="button"
            value="Add New Post"
            id="addnew"
            onClick={handleAddNewPost}
          />
        </div>
      </div>
      <div class="allposts">
        {allposts &&
          allposts.map((post, index) => {
            return (
              <div class="postcard" key={post.id}>
                <div class="postheader">
                  <h3>Post {post.id}</h3>
                  <h3>{moment(post.timestamp).format('MMMM Do YYYY')}</h3>
                </div>
                <div class="postcontent">
                  <h3>{post.title}</h3>
                  <p>{post.text}</p>
                </div>
                <div class="postbuttons">
                  <input
                    type="button"
                    id="edit"
                    value="Edit"
                    onClick={() => editPost(post.id)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    id="delete"
                    onClick={() => deletePost(post.id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
