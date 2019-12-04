import React, {useState} from 'react';
import './NewsViewer.css'
import axios from 'axios';

const NewsViewer = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);

  function deletePost() {
    axios
      .delete(`/news/post/${props.post.news_id}`)
      .then(results => {
        console.log(results.data.message)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const { imageUrls } = props.post
  return (
    <div className='NewsViewer'>
      {!edit ? <h1>{title}</h1> : <input onChange={e => setTitle(e.target.value)} value={title}/>}
      <div className="media-holder">
        {imageUrls.map((url, i) => (
          <img src={url} alt={i} key={i} />
        ))}
      </div>
      {!edit ? <article>{content}</article> : <textarea onChange={e => setContent(e.target.value)} vaule={content}/>}
      {
        !props.pv
          ?
          //{
          props.adm
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
    </div>
  );
};

export default NewsViewer;