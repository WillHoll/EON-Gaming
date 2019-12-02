INSERT INTO mediapost (user_id, title, content, post_time)
VALUES (${user_id}, ${title}, ${content}, NOW())
RETURNING media_id;