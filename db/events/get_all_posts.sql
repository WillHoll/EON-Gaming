SELECT * FROM eventpost e
WHERE event_id IN (
  SELECT event_id FROM eventpost
  ORDER BY event_id DESC
  LIMIT 10
  OFFSET $1
)
ORDER BY event_id DESC;