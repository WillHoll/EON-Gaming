INSERT INTO newspost (title, content, post_time)
VALUES ($1, $2, NOW())
RETURNING news_id;