import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './PostViewer.css';

const PostViewer = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);

  function deletePost() {
    axios
      .delete(`/${props.mode}/post/${props.post_id}`)
      .then(results => {
        console.log(results.data.message)
      })
      .catch(err => {
        console.log(err)
      })
  };


  const { user_id, imageUrls } = props.post
  const { username, profile_pic } = props.post.authorInfo
  const { currUser_id } = props
  return (
    <div className='PostViewer'>
      <div className="profile_holder">
        <img src={profile_pic} alt={username} />
        <h3>{username}</h3>
      </div>
      {!edit ? <h1>{title}</h1> : <input onChange={e => setTitle(e.target.value)} value={title}/>}
      <div className="media-holder">
        {imageUrls.map((url, i) => (
          <img src={url} alt={i} key={i} />
        ))}
      </div>
      {!edit ? <article>{content}</article> : <textarea className='textarea'  onChange={e => setContent(e.target.value)} value={content}/>}
      {
        !props.pv
          ?
          //{
          currUser_id === user_id
            ?
            //{
            !edit
              ?
              <div className="button-handler">
                <button onClick={() => setEdit(!edit)}>Edit</button>
                <button onClick={() => deletePost()}>Delete</button>
              </div>
              :
              <div className="button-handler">
                <button>Save</button>
                <button onClick={() => setEdit(!edit)}>Cancel</button>
              </div>
            //}
            :
            null
          //}
          :
          null
      }
      {
        !props.pv
        &&
        currUser_id !== user_id
        &&
        props.adm
        &&
        <div className="button-handler">
          <button onClick={() => deletePost()}>Remove</button>
        </div>
      }
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { currUser_id } = reduxState
  return {
    currUser_id
  };
};

export default connect(mapStateToProps)(PostViewer);