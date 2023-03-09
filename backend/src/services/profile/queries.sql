/* @name getStudentDetails */
SELECT "students"."id", "students"."id_num", "students"."name", "students"."address", "students"."contact", "students"."email", "batches"."name" AS batch
FROM "students"
LEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"
WHERE "students"."id_num" = :studentIDNum;
