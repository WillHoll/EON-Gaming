import React, { Component } from 'react';
import axios from 'axios';
import NewsViewer from './../../newsViewer/NewsViewer';
import './News.css'
import { connect } from 'react-redux';
import Poster from '../../poster/Poster';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      userIsAdmin: false,
      preview: false
    }
  }

  componentDidMount() {
    this.getTen();
    this.sessionCheck();
  }


  sessionCheck() {
    if (this.props.currUser_id !== 0) {
      const {newsAuth} = this.props
      this.setState({userIsAdmin: newsAuth})
    }
    if (this.props.currUser_id === 0) {
      axios
        .get('/auth/session')
        .then(response => {
          const {newsauth} = response.data
          this.setState({userIsAdmin: newsauth})
        })
    }
  }

  getTen() {
    axios
      .get('/news/posts')
      .then(result => {
        this.setState({
          newsList: result.data
        });
      });
  }
  
  render() {
    const {newsList, userIsAdmin, preview} = this.state
    const newsMap = newsList.map(post => (
      <div key={post.news_id} className="post-container">
        <NewsViewer post={post} adm={userIsAdmin} pv={preview} />
      </div>
    ))
    return (
      <div className='News'>
        {userIsAdmin ? <Poster /> : null}
        {newsMap}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {newsAuth, currUser_id} = reduxState;
  return {
    newsAuth,
    currUser_id
  }
}

export default connect(mapStateToProps)(News);