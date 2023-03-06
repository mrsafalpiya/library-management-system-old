/* @name getAllReservations */
SELECT "students"."id" AS student_id, "students"."name" AS student_name, "books"."id" AS book_id, "books"."title" AS book_title, "books"."author" AS book_author, "books"."publisher" AS book_publisher, "reservations"."created_at"
FROM "reservations"
JOIN "students" ON "students"."id" = "reservations"."student_id"
JOIN "books" ON "books"."id" = "reservations"."book_id";

/* @name getReservationsOfStudent */
SELECT "reservations"."id", "books"."id" AS book_id, "books"."title", "books"."author", "books"."publisher", "reservations"."created_at"
FROM "reservations"
JOIN "students" ON "students"."id" = "reservations"."student_id"
JOIN "books" ON "books"."id" = "reservations"."book_id"
WHERE "students"."id" = :studentID;

/* @name addReservation */
INSERT INTO "reservations" (
	book_id,
	student_id
) VALUES (
	:bookID,
	:studentID
);

/* @name removeReservation */
DELETE FROM "reservations"
WHERE "reservations"."id" = :reservationID;
