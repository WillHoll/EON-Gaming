UPDATE userlinks
SET email = ${email}, discord = ${discord}, twitter = ${twitter}, facebook = ${facebook}, twitch = ${twitch}
WHERE user_id = ${user_id}