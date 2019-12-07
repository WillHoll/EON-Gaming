import React, { Component } from 'react';
import axios from 'axios';
import PostViewer from '../../postViewer/PostViewer';
import { connect } from 'react-redux';
import Poster from '../../poster/Poster';

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mediaList: [],
      offset: 0,
      userIsAdmin: false,
      preview: false,
      user_id: 0
    };
    this.mediaPoster = this.mediaPoster.bind(this);
    this.mediaEditer = this.mediaEditer.bind(this);
    this.mediaDeleter = this.mediaDeleter.bind(this);
  };

  componentDidMount() {
    this.getMedia();
    this.sessionCheck();
  };

  mediaPoster(content, title, urlArr) {
    const {user_id} = this.state;
    const body = {user_id, content, title, urlArr};
    axios
      .post('/media/posts', body )
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  mediaDeleter(media_id) {
    axios
      .delete(`/media/post/${media_id}`)
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err)
      })
    };

  mediaEditer(title, content, media_id) {
    const body = {title, content}
    axios
      .put(`/media/post/${media_id}`, body)
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  sessionCheck() {
    if (this.props.currUser_id !== 0) {
      const {currUser_id, mediaAuth} = this.props
      this.setState({user_id: currUser_id, userIsAdmin: mediaAuth})
    };
    if (this.props.currUser_id === 0) {
      axios
        .get('/auth/session')
        .then(response => {
          const {user_id, mediaauth} = response.data
          this.setState({user_id, userIsAdmin: mediaauth})
        })
    };
  };

  getMedia() {
    const {offset} = this.state
    axios
      .get('/media/posts', offset)
      .then(result => {
        this.setState({
          mediaList: result.data
        });
      });
  };
  
  render() {
    const {mediaList, userIsAdmin, preview, user_id} = this.state;
    const mediaView = mediaList.map(post => (
      <div key={post.media_id} className="post-container">
        <PostViewer deleterFn={this.mediaDeleter} editerFn={this.mediaEditer} post_id={post.media_id} post={post} adm={userIsAdmin} pv={preview} mode='media'/>
      </div>
    ));
    return (
      <div className='media'>
        {user_id ? <Poster posterFn={this.mediaPoster}/> : null}
        {mediaView}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {mediaAuth, currUser_id} = reduxState
  return {
    mediaAuth,
    currUser_id
  }
}

export default connect(mapStateToProps)(Media);