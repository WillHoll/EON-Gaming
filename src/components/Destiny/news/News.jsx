import React, { Component } from 'react';
import axios from 'axios';
import NewsViewer from './../../newsViewer/NewsViewer';
import './News.css'

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
      <div className="post-container">
        <NewsViewer post={post} key={post.news_id} adm={userIsAdmin} pv={preview} />
      </div>
    ))
    return (
      <div className='News'>
        {newsMap}
      </div>
    );
  }
}

export default News;