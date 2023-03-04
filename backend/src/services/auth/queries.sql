/* @name LoginStudent */
SELECT "id", "id_num", "name", "password_hashed"
FROM "students" WHERE id_num=:idNum;
