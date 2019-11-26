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
  post_time TIMESTAMPTZ
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
  post_time TIMESTAMPTZ,
  user_id INT REFERENCES users (user_id)
);

CREATE TABLE eventpost_image (
  eventpost_image_id SERIAL PRIMARY KEY,
  event_id INT REFERENCES eventpost (event_id)
  image_id INT REFERENCES images (image_id)
);

CREATE TABLE mediapost (
  media_id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  post_time TIMESTAMPTZ,
  user_id INT REFERENCES users (user_id)
);

CREATE TABLE mediapost_image (
  mediapost_image_id SERIAL PRIMARY KEY,
  media_id INT REFERENCES mediapost (media_id),
  image_id INT REFERENCES images (image_id)
);




[
    {
        "news_id": 3,
        "title": "please stop this already, I can't take it",
        "content": "I decided to change this dummy data so I could tell it had been changed through my edit endpoint. Pretty neat, huh? I have also introduced punctuation to my writing. Grammar Nazis rejoice!!",
        "post_time": "2019-11-25T18:13:48.062Z",
        "imageUrls": [
            "https://robohash.org/lkjsd",
            "https://robohash.org/inuhyg"
        ]
    },
    {
        "news_id": 2,
        "title": "some fake news",
        "content": "some content for this news article for showing people that my stuff works and postman won't let me use lorem to create dummy data so this is the best I could do but it's better than some other things I could be putting in this space kinda like the whole 'why do you play so many video games' well, mom, I could be doing drugs right now, but I'm at home where you know I'm safe and not in any danger if you want I could change that by starting some drugs right now if that's what you really want do you want me to start doing drugs because I can it would be really simple do you remember Joey, he's got pot and meth and I could look just like Joey, do you want me to look like Joey because i can mom just let me play Mario in peace.",
        "post_time": "2019-11-25T18:07:24.464Z",
        "imageUrls": [
            "https://robohash.org/432",
            "https://robohash.org/lololol",
            "https://robohash.org/hehe"
        ]
    }
]