-- name: CreateIDType :one
INSERT INTO id_types (
	id_type
) VALUES (
	$1
) RETURNING *;

-- name: GetIDType :one
SELECT * FROM id_types
WHERE id = $1 LIMIT 1;

-- name: ListIDTypes :many
SELECT * FROM id_types
ORDER BY id;

-- name: UpdateIDType :one
UPDATE id_types
SET id_type = $2
WHERE id = $1
RETURNING *;

-- name: DeleteIDType :exec
DELETE FROM id_types
WHERE id = $1;
