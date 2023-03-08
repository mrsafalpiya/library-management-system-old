/* @name listBooks */
SELECT *
FROM "books"
WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''
ORDER BY (CASE WHEN :orderParam = 'title' AND :orderSort = 'asc' THEN title END) ASC,
         (CASE WHEN :orderParam = 'title' AND :orderSort = 'desc' THEN title END) DESC,
         (CASE WHEN :orderParam = 'author' AND :orderSort = 'asc' THEN author END) ASC,
         (CASE WHEN :orderParam = 'author' AND :orderSort = 'desc' THEN author END) DESC,
         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'asc' THEN publisher END) ASC,
         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'desc' THEN publisher END) DESC
LIMIT :limit
OFFSET :offset;

/* @name listBooksCount */
SELECT COUNT(*)
FROM books
WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = '';

/* @name addReservation */
INSERT INTO "reservations" (
	book_id,
	student_id
) VALUES (
	:bookID,
	:studentID
);

/* @name getCopy */
SELECT "copies"."id" as copy_id, "books".*, EXISTS(
	SELECT 1
	FROM "borrows"
	JOIN "copies" ON "borrows"."copy_id" = "copies"."id"
	WHERE "copies"."register_id" = :registerID
) AS is_borrowed
FROM "books"
JOIN "copies" ON "copies"."book_id" = "books"."id"
WHERE "copies"."register_id" = :registerID;
