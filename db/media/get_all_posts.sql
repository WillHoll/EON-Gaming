SELECT * FROM mediapost m
JOIN users u ON u.user_id = m.user_id
WHERE media_id IN (
  SELECT media_id FROM mediapost
  ORDER BY media_id DESC
  LIMIT 10
  OFFSET $1
)
ORDER BY media_id DESC;