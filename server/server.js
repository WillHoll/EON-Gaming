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
  secret: SESSION_SECRET
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

app.get('/news/posts', newsCtrl.getNews);
app.post('/news/posts', newsCtrl.postNews);
app.put('/news/post/:news_id', newsCtrl.editNews);
app.delete('/news/post/:news_id', newsCtrl.deleteNews);

// event post endpoints

app.get('events/posts', eventsCtrl.getEvents);
app.post('/events/posts', eventsCtrl.postEvent);
app.put('/events/post/:event_id', eventsCtrl.editEvent);
app.delete('/events/post/:event_id', eventsCtrl.deleteEvent)

//AMAZON S3 BUCKET URL REQUEST


//MASSIVE DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () =>
    console.log(`patient ${SERVER_PORT}, we're sorry to inform you that your doctor never came in today.`));
});