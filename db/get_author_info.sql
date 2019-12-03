SELECT username, image_url AS profile_pic FROM users u
JOIN images i ON i.image_id = u.image_id
WHERE u.user_id = $1;