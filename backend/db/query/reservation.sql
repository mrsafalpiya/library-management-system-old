-- name: CreateReservation :one
INSERT INTO reservations (
	book_id,
	user_id
) VALUES (
	$1, $2
) RETURNING *;

-- name: GetReservation :one
SELECT * FROM reservations
WHERE id = $1 LIMIT 1;

-- name: DeleteReservation :exec
DELETE FROM reservations
WHERE id = $1;
