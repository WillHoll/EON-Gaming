import React from 'react';
import {connect} from 'react-redux';
import './Header.css'

function Header()  {
  render() {

    return (
      <header>
        <img src="" alt="Eon logo"/>
        <nav>
          <ul>
            <li>Home</li>
            <li>News</li>
            <li>Events</li>
            <li>Media</li>
          </ul>
        </nav>
        {
          username
          ?
          <div className="profile-holder">
            <img src={profile_pic} alt=""/>
            
          </div>
          :

        }
      </header>
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