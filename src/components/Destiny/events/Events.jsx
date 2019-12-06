import React, { Component } from 'react';
import axios from 'axios';
import './Events.css'
import PostViewer from '../../postViewer/PostViewer';
import { connect } from 'react-redux';
import Poster from '../../poster/Poster';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      offset: 0,
      userIsAdmin: false,
      preview: false,
      user_id: 0
    };
  };

  componentDidMount() {
    this.getEvents();
    this.setAdmin();
  };
  
  setAdmin() {
    this.setState({
      userIsAdmin: this.props.eventAuth
    });
  };
  
  getEvents() {
    const {offset} = this.state
    axios
    .get('/events/posts', offset)
    .then(result => {
      this.setState({
        eventsList: result.data
      })
    })
    .catch (err => {
      console.log(err)
    });
  };

  setUserId() {
    const {currUser_id} = this.props
    console.log(currUser_id);
    if (!currUser_id) {
      return alert('must log in to post');
    } else {
      this.setState({
        user_id: this.props.currUser_id
      });
    };
  };
  
  render() {
    const {eventsList, userIsAdmin, preview, user_id} = this.state;
    const eventView = eventsList.map(post => (
      <div key={post.event_id} className="post-container">
        <PostViewer post_id={post.event_id} post={post} adm={userIsAdmin} pv={preview} mode='events'/>
      </div>
    ));
    return (
      <div className='events'>
        <button onClick={() => this.setUserId()} >Post</button>
        {user_id ? <Poster /> : null}
        {eventView}
      </div>
    );
  };
};

function mapStateToProps(reduxState) {
  const {eventAuth, currUser_id} = reduxState;
  return {
    eventAuth,
    currUser_id
  };
};

export default connect(mapStateToProps)(Events);