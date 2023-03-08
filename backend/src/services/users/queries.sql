/* @name getStudentName */
SELECT "students"."name"
FROM "students"
WHERE "students"."id" = :studentID;

/* @name getStaffName */
SELECT "staffs"."name"
FROM "staffs"
WHERE "staffs"."id" = :staffID;

/* @name getAllStudents */
SELECT "students"."name", "students"."id_num", "batches"."name" as "batch"
FROM "students"
JOIN "batches" ON "batches"."id" = "students"."id"
WHERE to_tsvector('english', "students"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
ORDER BY (CASE WHEN :orderParam = 'name' AND :orderSort = 'asc' THEN "students"."name" END) ASC,
         (CASE WHEN :orderParam = 'name' AND :orderSort = 'desc' THEN "students"."name" END) DESC
LIMIT :limit
OFFSET :offset;

/* @name getAllStudentsCount */
SELECT COUNT(*)
FROM "students"
WHERE to_tsvector('english', "students"."name") @@ to_tsquery('english', :searchParam) or :searchParam = '';

/* @name getAllStaffs */
SELECT "staffs"."name", "staffs"."id_num"
FROM "staffs"
WHERE to_tsvector('english', "staffs"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
ORDER BY (CASE WHEN :orderParam = 'name' AND :orderSort = 'asc' THEN "staffs"."name" END) ASC,
         (CASE WHEN :orderParam = 'name' AND :orderSort = 'desc' THEN "staffs"."name" END) DESC
LIMIT :limit
OFFSET :offset;

/* @name getAllStaffsCount */
SELECT COUNT(*)
FROM "staffs"
WHERE to_tsvector('english', "staffs"."name") @@ to_tsquery('english', :searchParam) or :searchParam = '';

/* @name getStudentInfo */
SELECT "students"."id", "students"."id_num", "students"."name", "batches"."name" AS batch
FROM "students"
JOIN "batches" ON "batches"."id" = "students"."batch_id"
WHERE "students"."id_num" = :studentIDNum;

/* @name getStudentBorrows */
SELECT "copies"."register_id", "books"."title", "books"."author", "books"."publisher", "borrows"."created_at" as issue_date, "borrows"."duration_days" as issue_duration_days
FROM "borrows"
JOIN "copies" ON "copies"."id" = "borrows"."copy_id"
JOIN "books" ON "books"."id" = "copies"."book_id"
JOIN "students" ON "students"."id" = "borrows"."student_id"
WHERE "students"."id_num" = :studentIDNum
ORDER BY "issue_date" DESC;
