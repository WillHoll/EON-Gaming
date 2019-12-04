import React, { Component } from 'react';
import axios from 'axios';
import './Events.css'
import PostViewer from '../../postViewer/PostViewer';
import { connect } from 'react-redux';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      offset: 0,
      userIsAdmin: false,
      preview: false
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

  render() {
    const {eventsList, userIsAdmin, preview} = this.state;
    const eventView = eventsList.map(post => (
      <div key={post.event_id} className="post-container">
        <PostViewer post_id={post.event_id} post={post} adm={userIsAdmin} pv={preview} mode='events'/>
      </div>
    ));
    return (
      <div>
        {eventView}
      </div>
    );
  };
};

function mapStateToProps(reduxState) {
  const {eventAuth} = reduxState;
  return {
    eventAuth
  };
};

export default connect(mapStateToProps)(Events);