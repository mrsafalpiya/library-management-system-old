-- name: CreateUser :one
INSERT INTO users (
	id_type_id,
	id_num,
	name,
	password_hashed
) VALUES (
	$1, $2, $3, $4
) RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE id = $1 LIMIT 1;

-- name: GetUserOfIDNum :one
SELECT * FROM users
WHERE id_num = $1 LIMIT 1;

-- name: ListUsers :many
SELECT * FROM users
ORDER BY id
LIMIT $1
OFFSET $2;

-- name: ListUsersOfIDType :many
SELECT * FROM users
WHERE id_type_id = $1
ORDER BY id
LIMIT $2
OFFSET $3;

-- name: UpdateUser :one
UPDATE users
SET id_type_id = $2, id_num = $3, name = $4, password_hashed = $5
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;
