/* @name getStaffDashboardProfile */
SELECT "staffs"."name", "staffs"."id_num"
FROM "staffs"
WHERE "staffs"."id" = :staffID;

/* @name getStaffDashboardStats */
SELECT
	(SELECT count(*) AS books_count FROM "books"),
	(SELECT count(*) AS students_count FROM "students"),
	(SELECT count(*) AS staffs_count FROM "staffs"),
	(SELECT count(*) AS reservations_count FROM "reservations");
