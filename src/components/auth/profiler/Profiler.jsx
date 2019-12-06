import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import getUserInfo from './../../../ducks/reducer'
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';
import './Profiler.css';


class Profiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currUsername,
      facebook: '',
      twitter: '',
      discord: '',
      twitch: '',
      isUploading: false,
      url: 'http://via.placeholder.com/200x200'
    };
  };

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. 
    //This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. 
    //We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data
        this.uploadFile(file, signedRequest, url)
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      }
    };
    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url })
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. you may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      });
  };

  submitButtonFn(body) {
    axios
      .post('/auth/register/profile', body)
      .then(response => {
        const {user_id, username, image_url} = response.data.user
        console.log(response.data.message)
        getUserInfo(username, image_url, user_id)
        this.props.history.push('/')
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }

  render() {
    const { username, facebook, twitter, discord, twitch, url, isUploading } = this.state
    return (
      <div className='Profiler'>
        <div className="profiler-holder">
          <h2>SET UP YOUR PROFILE</h2>
          <div className="input-h4">
            <h4>Username:</h4>
            <input value={username} onChange={e => this.setState({ username: e.target.value })} maxLength='40' type="text" />
          </div>
          <div className="dropzone-image">
            <img src={url} alt="" width='200px' />
            <Dropzone
              onDropAccepted={this.getSignedRequest}
              style={{
                position: 'relative',
                top: -60,
                width: 100,
                height: 100,
                borderWidth: 7,
                marginTop: 100,
                borderColor: 'rgb(102, 102, 102)',
                borderStyle: 'dashed',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
              }}
              accept="image/*"
              multiple={false}
            >
              {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
            </Dropzone>
          </div>
          <div className="input-h4">
            <h4>Discord:</h4>
            <input value={discord} maxLength='255' onChange={e => this.setState({ discord: e.target.value })} type="text" />
          </div>
          <div className="input-h4">
            <h4>Twitch:</h4>
            <input value={twitch} maxLength='255' onChange={e => this.setState({ twitch: e.target.value })} type="text" />
          </div>
          <div className="input-h4">
            <h4>Twitter:</h4>
            <input value={twitter} maxLength='255' onChange={e => this.setState({ twitter: e.target.value })} type="text" />
          </div>
          <div className="input-h4">
            <h4>Facebook:</h4>
            <input value={facebook} maxLength='255' onChange={e => this.setState({ facebook: e.target.value })} type="text" />
          </div>
          <div className="button-holder">
            <button onClick={() => this.submitButtonFn({username, image_url: url, discord, facebook, twitch, twitter, user_id: this.props.currUser_id })} >Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { currUsername, currUser_id } = reduxState;
  return {
    currUsername,
    currUser_id
  }
}

export default connect(mapStateToProps, {getUserInfo})(Profiler);