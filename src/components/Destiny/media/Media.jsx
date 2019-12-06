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
      preview: false
    };
  };

  componentDidMount() {
    this.setAdmin();
    this.getMedia();
  };

  setAdmin() {
    this.setState({
      userIsAdmin: this.props.mediaAuth
    });
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
    const {mediaList, userIsAdmin, preview} = this.state;
    const mediaView = mediaList.map(post => (
      <div key={post.media_id} className="post-container">
        <PostViewer post_id={post.media_id} post={post} adm={userIsAdmin} pv={preview} mode='media'/>
      </div>
    ));
    return (
      <div className='media'>
        {this.props.currUser_id ? <Poster /> : null}
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