SELECT * FROM mediapost
WHERE media_id IN (
  SELECT media_id FROM mediapost
  ORDER BY media_id DESC
  LIMIT 10
  OFFSET $1
)
ORDER BY media_id DESC;