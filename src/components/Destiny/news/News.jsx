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
    };
    this.newsPoster = this.newsPoster.bind(this);
    this.newsEditer = this.newsEditer.bind(this);
    this.newsDeleter = this.newsDeleter.bind(this);
  };

  componentDidMount() {
    this.getTen();
    this.sessionCheck();
  };

  newsPoster(content, title, urlArr) {
    const body = { title, content, urlArr };
    axios
      .post('/news/posts', body)
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  newsDeleter(news_id) {
    axios
      .delete(`news/post/${news_id}`)
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  newsEditer(title, content, news_id) {
    const body = { title, content };
    axios
      .put(`news/post/${news_id}`, body)
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
      const { newsAuth } = this.props;
      this.setState({ userIsAdmin: newsAuth });
    };
    if (this.props.currUser_id === 0) {
      axios
        .get('/auth/session')
        .then(response => {
          const { newsauth } = response.data;
          this.setState({ userIsAdmin: newsauth });
        });
    };
  };

  getTen() {
    axios
      .get('/news/posts')
      .then(result => {
        this.setState({
          newsList: result.data
        });
      });
  };

  render() {
    const { newsList, userIsAdmin, preview } = this.state;
    const newsMap = newsList.map(post => (
      <div key={post.news_id} className="post-container">
        <NewsViewer deleterFn={this.newsDeleter} editerFn={this.newsEditer} post_id={post.news_id} post={post} adm={userIsAdmin} pv={preview} />
      </div>
    ));
    return (
      <div className='News'>
        {userIsAdmin ? <Poster posterFn={this.newsPoster} /> : null}
        {newsMap}
      </div>
    );
  };
};

function mapStateToProps(reduxState) {
  const { newsAuth, currUser_id } = reduxState;
  return {
    newsAuth,
    currUser_id
  };
};

export default connect(mapStateToProps)(News);