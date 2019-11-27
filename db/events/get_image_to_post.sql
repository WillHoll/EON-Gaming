SELECT image_url FROM eventpost_image ei
JOIN images i ON i.image_id = ei.image_id
WHERE ei.event_id = $1;