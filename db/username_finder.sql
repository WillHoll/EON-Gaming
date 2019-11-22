SELECT COUNT(*) FROM users
WHERE user_id != $1
AND username = $2;