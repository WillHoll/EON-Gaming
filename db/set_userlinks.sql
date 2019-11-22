UPDATE userlinks
SET discord = $2, facebook = $3, twitch = $4, twitter = $5
WHERE user_id = $1