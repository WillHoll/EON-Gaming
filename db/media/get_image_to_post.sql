SELECT image_url FROM mediapost_image mi
JOIN images i ON i.image_id = mi.image_id
WHERE mi.media_id = $1;