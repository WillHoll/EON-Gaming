import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { v4 as randomString } from 'uuid';

class Poster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      urlArr: [],
      isUploading: false
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
        this.setState({ isUploading: false, urlArr: [...this.state.urlArr, url] })
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
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  postHandler(content, title, urlArr) {
    this.props.posterFn(content, title, urlArr);
    this.setState({
      content: '',
      title: '',
      urlArr: []
    });
  };


  
  render() {
    const {content, title, urlArr, isUploading} = this.state
    return (
      <div className='poster'>
        <div className="poster-holder">
          <div className="input-h4">
            <h4>Title:</h4>
            <input maxLength='60' value={title} onChange={e => this.setState({title: e.target.value})} type="text"/>
          </div>
          <div className="input-h4">
            <h4>Content:</h4>
            <textarea value={content} onChange={e => this.setState({content: e.target.value})} type='text' />
          </div>
          <div className="image-dropzone">
            {urlArr.map((img, i) => (
              <img src={img} alt={i} key={i} height='100px' />
            ))}
            <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              position: 'relative',
              width: 90,
              height: 90,
              borderStyle: 'dashed',
              borderWidth: 7,
              borderColor: 'rgb(102, 102, 102)',
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 30
            }}
            accept='image/*'
            multiple={true}
            >
              {isUploading ? <GridLoader /> : <p>+</p>}
            </Dropzone>
          </div>
            <button onClick={() => this.postHandler(content, title, urlArr)} >Post</button>
        </div>
      </div>
    );
  }
}

export default Poster;