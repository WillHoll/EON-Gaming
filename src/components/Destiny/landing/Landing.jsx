import React, { Component } from 'react';
import axios from 'axios';
import PostViewer from './../../postViewer/PostViewer';
import NewsViewer from './../../newsViewer/NewsViewer';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNews: {
        title: '',
        content: '',
        imageUrls: []
      },
      firstEvent: {
        authorInfo: {
          profile_pic: '',
          username: ''
        },
        user_id: '',
        title: '',
        content: '',
        imageUrls: []
      },
      firstMedia: {
        authorInfo: {
          profile_pic: '',
          username: '',
        },
        user_id: '',
        title: '',
        content: '',
        imageUrls: []
      },
      userIsAdmin: false,
      preview: true
    }
  }

  componentDidMount() {
    this.getFirstNews();
    this.getFirstEvent();
    this.getFirstMedia();
  }

  getFirstNews() {
    axios
      .get('/news/post')
      .then(res => {
        this.setState({
          firstNews: res.data
        });
      });
  };

  getFirstEvent() {
    axios
      .get('/events/post')
      .then(res => {
        this.setState({
          firstEvent: res.data
        });
      });
  };

  getFirstMedia() {
    axios
      .get('/media/post')
      .then(res => {
        this.setState({
          firstMedia: res.data
        });
      });
  };

  render() {
    const { firstNews, firstMedia, firstEvent, userIsAdmin, preview } = this.state
    return (
      <div className='Landing'>
        <h2>NEWS </h2>
        <Link to='/news' className={'link'}>
          <NewsViewer post={firstNews} adm={userIsAdmin}  pv={preview} />
        </Link>
        <h2>EVENTS</h2>
        <Link to='/events' className={'link'}>
          <PostViewer post={firstEvent} adm={userIsAdmin} pv={preview} />
        </Link>
        <h2>MEDIA</h2>
        <Link to='/media' className={'link'}>
          <PostViewer post={firstMedia} adm={userIsAdmin} pv={preview} />
        </Link>
      </div>
    );
  }
}

export default Landing;