INSERT INTO eventpost (user_id, title, content, post_time)
VALUES(${user_id}, ${title}, ${content}, NOW())
RETURNING event_id;