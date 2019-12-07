import React, { Component } from 'react';
import axios from 'axios';
import './Events.css';
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
    this.eventPoster = this.eventPoster.bind(this);
    this.eventEditer = this.eventEditer.bind(this);
    this.eventDeleter = this.eventDeleter.bind(this);
  };

  componentDidMount() {
    this.getEvents();
    this.setAdmin();
    this.sessionCheck();
  };

  sessionCheck() {
    if (this.props.currUser_id !== 0) {
      const {currUser_id, eventsAuth} = this.props
      this.setState({user_id: currUser_id, userIsAdmin: eventsAuth})
    };
    if (this.props.currUser_id === 0) {
      axios
        .get('/auth/session')
        .then(response => {
          const {user_id, eventsauth} = response.data
          this.setState({user_id, userIsAdmin: eventsauth})
        });
    };
    this.eventEditer = this.eventEditer.bind(this)
  };
  
  setAdmin() {
    this.setState({
      userIsAdmin: this.props.eventAuth
    });
  };
  
  eventPoster(content, title, urlArr) {
    const {user_id} = this.state;
    const body = {user_id, content, title, urlArr};
    axios
      .post('/events/posts', body )
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      });
  };

  eventDeleter(event_id) {
    axios
      .delete(`/events/post/${event_id}`)
      .then(response => {
        console.log(response.data.message);
        this.componentDidMount();
      })
      .then(err => {
        console.log(err)
      });
  };

  eventEditer(title, content, event_id) {
    const body = {title, content}
    axios
      .put(`events/post/${event_id}`, body)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEvents() {
    const {offset} = this.state;
    axios
    .get('/events/posts', offset)
    .then(result => {
      this.setState({
        eventsList: result.data
      })
    })
    .catch (err => {
      console.log(err);
    });
  };


  
  render() {
    const {eventsList, userIsAdmin, preview, user_id} = this.state;
    const eventView = eventsList.map(post => (
      <div key={post.event_id} className="post-container">
        <PostViewer deleterFn={this.eventDeleter} editerFn={this.eventEditer} post_id={post.event_id} post={post} adm={userIsAdmin} pv={preview} />
      </div>
    ));
    return (
      <div className='events'>
        
        {user_id ? <Poster posterFn={this.eventPoster} /> : null}
        {eventView}
      </div>
    );
  };
};

function mapStateToProps(reduxState) {
  const {eventsAuth, currUser_id} = reduxState;
  return {
    eventsAuth,
    currUser_id
  };
};

export default connect(mapStateToProps)(Events);