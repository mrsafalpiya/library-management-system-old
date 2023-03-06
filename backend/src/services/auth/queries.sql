/* @name loginStudent */
SELECT "id", "id_num", "name", "password_hashed"
FROM "students" WHERE id_num=:idNum;

/* @name loginStaff */
SELECT "id", "id_num", "name", "password_hashed"
FROM "staffs" WHERE id_num=:idNum;
