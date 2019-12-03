import React from 'react';
import './NewsViewer.css'

const NewsViewer = (props) => {
  const { title, content, imageUrls, adm } = props.post
  return (
    <div className='NewsViewer'>
      <h1>{title}</h1>
      <div className="media-holder">
        {imageUrls.map((url, i) => (
          <img src={url} alt={i} key={i} />
        ))}
      </div>
      <article>{content}</article>
      {!props.pv
        &&
        adm
        &&
        <div className="button-holder">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      }
    </div>
  );
};

export default NewsViewer;