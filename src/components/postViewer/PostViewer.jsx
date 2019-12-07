import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './PostViewer.css';

const PostViewer = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);
  const [thisUser_id, setUser_id] = useState(0)

  useEffect(() => {
    sessionCheck();
  })

  function sessionCheck() {
    if (props.currUser_id !== 0) {
      const {currUser_id} = props
      setUser_id(currUser_id);
    };
    if (props.currUser_id === 0) {
      axios
        .get('/auth/session')
        .then(response => {
          const {user_id} = response.data
          setUser_id(user_id);
        })
    };
  };

  function editHandler(title, content, post_id) {
    props.editerFn(title, content, post_id);
    setEdit(!edit);
  };


  const { user_id, imageUrls } = props.post
  const { username, profile_pic } = props.post.authorInfo
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
          thisUser_id === user_id
            ?
            //{
            !edit
              ?
              <div className="button-handler">
                <button onClick={() => setEdit(!edit)}>Edit</button>
                <button onClick={() => props.deleterFn(props.post_id)}>Delete</button>
              </div>
              :
              <div className="button-handler">
                <button onClick={() => editHandler(title, content, props.post_id)} >Save</button>
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
        thisUser_id !== user_id
        &&
        props.adm
        &&
        <div className="button-handler">
          <button onClick={() => props.deleterFn(props.post_id)}>Remove</button>
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