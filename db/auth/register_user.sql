INSERT INTO users (username, image_id)
VALUES (${username}, ${image_id})
RETURNING user_id;