require('dotenv').config();
const express = require('express');
const session = require('express-session')
const massive = require('massive')
const aws = require('aws-sdk');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;
const app = express();

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET
}));



//auth endpoints

//AMAZON S3 BUCKET URL REQUEST


//MASSIVE DATABASE CONNECTION
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () =>
    console.log(`patient ${SERVER_PORT}, we're sorry to inform you that your doctor never came in today.`));
});