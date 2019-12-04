import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: ''
    }
  }
  
  render() {
    return (
      <div className='login'>
        <div className="login-holder">
          <h2>LOGIN</h2>
          <div className="usernamer">
            <h4>username:</h4>
            <input value={username}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;