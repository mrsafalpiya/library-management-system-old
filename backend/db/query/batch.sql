-- name: CreateBatch :one
INSERT INTO batches (
	name
) VALUES (
	$1
) RETURNING *;

-- name: GetBatch :one
SELECT * FROM batches
WHERE id = $1 LIMIT 1;

-- name: ListBatches :many
SELECT * FROM batches
ORDER BY id
LIMIT $1
OFFSET $2;

-- name: UpdateBatch :one
UPDATE batches
SET name = $2
WHERE id = $1
RETURNING *;

-- name: DeleteBatch :exec
DELETE FROM batches
WHERE id = $1;
