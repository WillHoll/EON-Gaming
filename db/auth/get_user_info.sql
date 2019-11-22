SELECT * FROM users u
JOIN images i ON u.image_id = i.image_id 
JOIN userlinks l ON l.user_id = u.user_id
WHERE u.user_id = $1;