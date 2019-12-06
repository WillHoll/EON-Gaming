require('dotenv').config();
const express = require('express');
const session = require('express-session')
const massive = require('massive')
const aws = require('aws-sdk');
const authCtrl = require('./controllers/authController');
const newsCtrl = require('./controllers/newsController');
const eventsCtrl = require('./controllers/eventsController');
const mediaCtrl = require('./controllers/mediaController');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;
const app = express();

//TOP LEVEL MIDDLEWARE
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

//auth endpoints

app.post('/auth/register/login', authCtrl.register );
app.post('/auth/register/profile', authCtrl.makeProfile);
app.post('/auth/login', authCtrl.login);
app.get('/auth/profile/info/:user_id', authCtrl.getInfo);
app.put('/auth/profile/edit/:user_id', authCtrl.editProfile);
app.put('/auth/profile/password/:user_id', authCtrl.updatePassword);
app.post('/auth/logout', authCtrl.logout);

// news post endpoints

app.get('/news/post', newsCtrl.getFirstNews)
app.get('/news/posts', newsCtrl.getNews);
app.post('/news/posts', newsCtrl.postNews);
app.put('/news/post/:news_id', newsCtrl.editNews);
app.delete('/news/post/:news_id', newsCtrl.deleteNews);

// event post endpoints

app.get('/events/post', eventsCtrl.getFirstEvent);
app.get('/events/posts', eventsCtrl.getEvents);
app.post('/events/posts', eventsCtrl.postEvent);
app.put('/events/post/:event_id', eventsCtrl.editEvent);
app.delete('/events/post/:event_id', eventsCtrl.deleteEvent);

// media post endpoints

app.get('/media/post', mediaCtrl.getFirstMedia);
app.get('/media/posts', mediaCtrl.getMedia);
app.post('/media/posts', mediaCtrl.postMedia);
app.put('/media/post/:media_id', mediaCtrl.editMedia);
app.delete('/media/post/:media_id', mediaCtrl.deleteMedia);

//AMAZON S3 BUCKET URL REQUEST

app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-east-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    return res.send(returnData)
  });
});

//MASSIVE DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () =>
    console.log(`patient ${SERVER_PORT}, we're sorry to inform you that your doctor never came in today.`));
});