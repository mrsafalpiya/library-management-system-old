-- name: CreateCopy :one
INSERT INTO copies (
	book_id
) VALUES (
	$1
) RETURNING *;

-- name: DeleteCopy :exec
DELETE FROM copies
WHERE id = $1;
