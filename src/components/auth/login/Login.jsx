import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSession } from '../../../ducks/reducer';
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  loggerInner(body) {
    axios
      .post('/auth/login', body)
      .then(result => {
        const { user_id, username, image_url, landingauth, newsauth, eventsauth, mediaauth } = result.data.user;
        console.log(result.data.message);
        this.props.getSession(username, image_url, user_id, landingauth, newsauth, eventsauth, mediaauth);
        this.props.history.push(`/`)
      })
      .catch(err => {
        alert(err.result.data.message)
      })
  }

  usernameHandler(value) {
    this.setState({
      username: value
    });
  };

  passwordHandler(value) {
    this.setState({
      password: value
    })
  }

  render() {
    const { username, password } = this.state
    return (
      <div className='login'>
        <div className="login-holder">
          <h2>LOGIN</h2>
          <div className="input-holder">
            <div className="input-h4">
              <h4>Username:</h4>
              <input value={username} maxLength='40' onChange={e => this.usernameHandler(e.target.value)} />
            </div>
            <div className="input-h4">
              <h4>Password:</h4>
              <input value={password} maxLength='20' type='password' onChange={e => this.passwordHandler(e.target.value)} />
            </div>
          </div>
          <div className="button-holder">
            <button onClick={() => this.loggerInner({ username, password })}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getSession })(Login);