SELECT * FROM newspost 
WHERE news_id IN (
  SELECT news_id FROM newspost
  ORDER BY news_id DESC
  LIMIT 10
  OFFSET $1
)
ORDER BY news_id DESC;