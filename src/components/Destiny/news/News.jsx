import React, { Component } from 'react';
import axios from 'axios';
import NewsViewer from './../../newsViewer/NewsViewer';
import './News.css'
import { connect } from 'react-redux';

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
    this.getTen()
  }

  setAuth() {
    this.setState({
      userIsAdmin: this.props.newsAuth
    })
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
        {newsMap}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {newsAuth} = reduxState;
  return {
    newsAuth
  }
}

export default connect(mapStateToProps)(News);