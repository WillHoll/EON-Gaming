import React, { Component } from 'react';
import axios from 'axios';
import PostViewer from '../../postViewer/PostViewer';
import NewsViewer from './../../newsViewer/NewsViewer';
import { Link } from 'react-router-dom';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firsts: [],
      userIsAdmin: false,
      preview: true
    }
  }

  componentDidMount() {
    this.getFirst();
  }

  getFirst() {
    axios
      .get('/news/post')
      .then(res => {
        this.setState({
          firsts: [...this.state.firsts, res.data]
        });
        axios
          .get('/events/post')
          .then(res => {
            this.setState({
              firsts: [...this.state.firsts, res.data]
            });
            axios
              .get('/media/post')
              .then(res => {
                this.setState({
                  firsts: [...this.state.firsts, res.data]
                });
              });
          });
      });
  };


  render() {
    const { firsts, userIsAdmin, preview } = this.state
    const viewers = firsts.map((post, i) => {
      if (i === 0) {
        return (
        <div key={i} className="encloser">
          <h2>NEWS </h2>
          <Link to='/news' className='link'>
            <NewsViewer post={post} adm={userIsAdmin} pv={preview} />
          </Link>
        </div>
        )
      } if (i === 1) {
        return (
        <div key={i} className="encloser">
          <h2>EVENTS</h2>
          <Link to='/events' className='link'>
            <PostViewer post={post} adm={userIsAdmin} pv={preview} />
          </Link>
        </div>
        )
      } if (i === 2) {
        return (
          <div key={i} className="encloser">
            <h2>MEDIA</h2>
            <Link to='/media' className='link'>
              <PostViewer post={post} adm={userIsAdmin} pv={preview} />
            </Link>
          </div>
        )
      } else {
        return null
      }
    }

    )
    return (
      <div className='Landing'>
        {viewers}
      </div>
    );
  }
}

export default Landing;