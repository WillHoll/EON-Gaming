require('dotenv').config();
const express = require('express');
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();

app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET
}));

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () =>
    console.log(`customer ${SERVER_PORT}, we're sorry to inform you that your doctor never came in today.`));
});