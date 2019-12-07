import React, {useState} from 'react';
import './NewsViewer.css'

const NewsViewer = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);


  function editHandler(title, content, post_id) {
    props.newsEditer(title, content, post_id);
    setEdit(!edit);
  }

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
                <button onClick={() => props.deleterFn(props.post_id)}>Delete</button>
              </div>
              :
              <div className="button-handler">
                <button onClick={() => editHandler(title, content, props.post_id)}>Save</button>
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