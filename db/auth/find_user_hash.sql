SELECT * FROM users u
JOIN hash h ON u.user_id = h.user_id
JOIN images i ON u.image_id = i.image_id
JOIN admin a ON a.user_id = u.user_id
WHERE username = $1