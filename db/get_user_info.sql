SELECT * FROM users u
JOIN images i ON u.images_id = i.images_id
JOIN userlinks l ON l.user_id = u.user_id
WHERE user_id = $1