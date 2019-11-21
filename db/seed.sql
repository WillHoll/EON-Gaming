CREATE TABLE images (
  image_id SERIAL PRIMARY KEY,
  image_url TEXT
)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    image_id INT REFERENCES images (image_id)
);

CREATE TABLE hash (
    hash_id SERIAL PRIMARY KEY,
    hash TEXT,
    user_id INT REFERENCES users (user_id)
);

CREATE TABLE userlinks (
    user_links_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    discord VARCHAR,
    twitch VARCHAR,
    facebook VARCHAR,
    twitter VARCHAR,
    user_id INT REFERENCES users (user_id)
);

CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    landingauth BOOL,
    newsauth BOOL,
    eventsauth BOOL,
    mediaauth BOOL,
    user_id INT REFERENCES users (user_id)
);

CREATE TABLE newspost (
  news_id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  content TEXT
);

CREATE TABLE newspost_image (
  newspost_image_id SERIAL PRIMARY KEY,
  news_id INT REFERENCES newspost (news_id),
  image_id INT REFERENCES images (image_id)
);

CREATE TABLE eventpost (
  event_id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  user_id INT REFERENCES 
)