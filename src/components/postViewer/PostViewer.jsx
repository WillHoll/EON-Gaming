import React from 'react';
import './PostViewer.css';
import { connect } from 'react-redux';

const PostViewer = (props) => {
  const { currUser_id } = props
  const { title, imageUrls, content, user_id } = props.post
  const { profile_pic, username } = props.post.authorInfo
  return (
    <div className='PostViewer'>
      <div className="profile_holder">
        <img src={profile_pic} alt={username} />
        <h3>{username}</h3>
      </div>
      <h1>{title}</h1>
      <div className="media-holder">
        {imageUrls.map((url, i) => (
          <img src={url} alt={i} key={i} />
        ))}
      </div>
      <article>{content}</article>
      {!props.pv
        &&
        currUser_id === user_id
        &&
        <div className="button-handler">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      }
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { currUser_id } = reduxState
  return (
    currUser_id
  )
}

export default connect(mapStateToProps)(PostViewer);