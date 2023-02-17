-- name: CreateProfile :one
INSERT INTO profiles (
	user_id,
	address,
	city,
	state,
	contact,
	email,
	batch_id
) VALUES (
	$1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: GetProfileOfID :one
SELECT * FROM profiles
WHERE user_id = $1 LIMIT 1;

-- name: UpdateProfile :one
UPDATE profiles
SET user_id = $2, address = $3, city = $4, state = $5, contact = $6, email = $7, batch_id = $8
WHERE user_id = $1
RETURNING *;
