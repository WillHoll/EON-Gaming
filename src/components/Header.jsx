import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  }
  
  render() {
    return (
      <div>
        Header.jsx
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {username, profile_pic} = reduxState
  return {
    username,
    profile_pic
  }
}

export default connect(mapStateToProps)(Header);