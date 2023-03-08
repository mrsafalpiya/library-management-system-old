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
SELECT "copies"."id" AS copy_id, "copies"."register_id" as copy_register_id, "books".*, exists(
	select 1
	FROM "borrows"
	JOIN "copies" ON "borrows"."copy_id" = "copies"."id"
	WHERE "copies"."register_id" = :registerID
) AS is_borrowed, "students"."id" AS borrower_id, "students"."name" AS borrower_name, "students"."id_num" AS borrower_id_num, "batches"."name" AS borrower_batch, "borrows"."created_at" AS borrowed_date, "borrows"."duration_days" AS borrow_duration_days
FROM "books"
JOIN "copies" ON "copies"."book_id" = "books"."id"
LEFT JOIN "borrows" ON "borrows"."copy_id" = "copies"."id"
LEFT JOIN "students" ON "students"."id" = "borrows"."student_id"
LEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"
WHERE "copies"."register_id" = :registerID;

/* @name issueBookBorrows */
INSERT INTO "borrows" ("copy_id", "student_id", "duration_days")
VALUES (:copyID, :studentID, :durationDays);

/* @name issueBookTransactions */
INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")
VALUES ('borrow', :copyID, :studentID);

/* @name returnBookBorrows */
DELETE FROM "borrows"
WHERE "copy_id" = :copyID;

/* @name returnBookTransactions */
INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")
VALUES ('return', :copyID, :studentID);

/* @name renewBookBorrows */
UPDATE "borrows"
SET
	"duration_days" = :durationDays,
	"created_at" = now()
WHERE "copy_id" = :copyID;

/* @name renewBookTransactions */
INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")
VALUES ('renew', :copyID, :studentID);
