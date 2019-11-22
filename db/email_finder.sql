SELECT COUNT(*) FROM userlinks
WHERE user_id != $1 AND email = $2;