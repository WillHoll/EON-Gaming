import React from 'react';
import { connect } from 'react-redux';
import './Header.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {withRouter} from 'react-router-dom';

function Header(props) {


  const { username, profile_pic, user_id } = props
  return (
    <header>
      <div className="logo-holder">
        <img src="https://scontent.fhhr1-1.fna.fbcdn.net/v/t1.0-9/51342897_2241190176202451_8792154038981361664_n.jpg?_nc_cat=106&_nc_oc=AQlZI9LUCRFPKF1OQqOHUE4HGi5kK_rFClWFUYduCZ2gKRXV6d5VkK5YrG3jUB7T2Rc&_nc_ht=scontent.fhhr1-1.fna&oh=08fd71b3fca230063a8ab3e9c2fc1817&oe=5E447B3F" alt="Eon logo" />
      </div>
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
            <img src={profile_pic} alt="" />
            <DropdownButton alignRight title={username} >
              <Dropdown.Item onClick={() => props.history.push(`/myprofile/${user_id}`)}>My Profile</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
          :
          <div className='button-holder'>
            <button onClick={() => props.history.push(`/login`)}>Login</button>
            <button onClick={() => props.history.push(`/register`)}>Register</button>
          </div>
        }
    </header>
  );
}

function mapStateToProps(reduxState) {
  const { username, profile_pic, user_id } = reduxState
  return {
    username,
    profile_pic,
    user_id
  }
}

export default connect(mapStateToProps)(withRouter(Header));