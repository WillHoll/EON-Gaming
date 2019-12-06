import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Header.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { withRouter, Link } from 'react-router-dom';
import { reduxResetter } from './../../ducks/reducer';

function Header(props) {

  function killSession() {
    axios
      .post('/auth/logout')
      .then(response => {
        console.log(response.data.message);
        reduxResetter();
      })
  }

  function retrieveSession() {

  }

  useEffect(() => {

  }, [])



  const { currUsername, currProfile_pic, currUser_id } = props
  return (
    <header>
      <div className="logo-holder">
        <img src="https://scontent.fhhr1-1.fna.fbcdn.net/v/t1.0-9/51342897_2241190176202451_8792154038981361664_n.jpg?_nc_cat=106&_nc_oc=AQlZI9LUCRFPKF1OQqOHUE4HGi5kK_rFClWFUYduCZ2gKRXV6d5VkK5YrG3jUB7T2Rc&_nc_ht=scontent.fhhr1-1.fna&oh=08fd71b3fca230063a8ab3e9c2fc1817&oe=5E447B3F" alt="Eon logo" />
      </div>
      <nav>
        <ul>
          <Link to='/' className='link'>
            <li>Home</li>
          </Link >
          <Link to='/news' className='link'>
            <li>News</li>
          </Link>
          <Link to='/events' className='link'>
            <li>Events</li>
          </Link>
          <Link to='/media' className='link'>
            <li>Media</li>
          </Link>
        </ul>
      </nav>
      {
        currUser_id !== 0
          ?
          <div className="profile-holder">
            <img src={currProfile_pic} alt="" />
            <DropdownButton alignRight title={currUsername} >
              <Dropdown.Item onClick={() => props.history.push(`/myprofile`)}>My Profile</Dropdown.Item>
      <Dropdown.Item onClick={() => killSession()}> Logout</Dropdown.Item>
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
};

function mapStateToProps(reduxState) {
  const { currUsername, currProfile_pic, currUser_id } = reduxState
  return {
    currUsername,
    currProfile_pic,
    currUser_id
  }
}

export default connect(mapStateToProps, {reduxResetter})(withRouter(Header));