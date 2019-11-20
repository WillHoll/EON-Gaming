import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Header.css'

class Header extends Component {

  render() {
    return (
      <div className='Header'>
        
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