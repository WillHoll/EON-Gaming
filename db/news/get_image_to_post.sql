SELECT image_url FROM newspost_image ni 
JOIN images i ON i.image_id = ni.image_id
WHERE ni.news_id = $1;