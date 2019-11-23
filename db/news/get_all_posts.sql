SELECT * FROM newspost n
JOIN newspost_image ni ON n.news_id = ni.news_id
JOIN images i ON i.image_id = ni.image_id
WHERE news_id IN (
  SELECT news_id FROM newspost
  ORDER BY news_id DESC
  LIMIT 10
  OFFSET $1
);