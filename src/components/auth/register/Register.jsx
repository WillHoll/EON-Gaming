import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSession } from '../../../ducks/reducer';
import './Register.css'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: ''
    }
  }

  registerer(body) {
    if (this.state.password1 === this.state.password2) {
      axios
        .post('/auth/register/login', body)
        .then(result => {
          const {user_id, username, profile_pic, landingAuth, newsAuth, eventsAuth, mediaAuth} = result.data.user;
          this.props.getSession(username, profile_pic, user_id, landingAuth, newsAuth, eventsAuth, mediaAuth);
          this.props.history.push('/register/profiler')
        })
    } else {
      alert('passwords do not match')
    }
  }

  render() {
    const { email, username, password1, password2 } = this.state;
    return (
      <div className='Register'>
        <div className="register-holder">
          <h2>CREATE ACCOUNT</h2>
          <div className="input-h4 ">
            <h4>Email:</h4>
            <input value={email} maxLength='40' onChange={e => this.setState({ email: e.target.value })} type="text" />
          </div>
          <div className="input-h4">
            <h4>Username:</h4>
            <input value={username} onChange={e => this.setState({ username: e.target.value })} maxLength='40' type="text" />
          </div>
          <div className="input-h4">
            <h4>Password:</h4>
            <input value={password1} onChange={e => this.setState({ password1: e.target.value })} maxLength='20' type="password" />
          </div>
          <div className="input-h4">
            <h4>Confirm Password:</h4>
            <input value={password2} onChange={e => this.setState({ password2: e.target.value })} maxLength='20' type="password" />
          </div>
          <div className="button-holder">
            <button onClick={() => this.registerer({email, username, password: password1})} >Register</button>
          </div>
        </div>
      </div>
    );
  };
};

export default connect(null, {getSession})(Register);