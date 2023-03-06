CREATE TABLE "staffs" (
  "id" bigserial PRIMARY KEY,
  "id_num" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "password_hashed" varchar NOT NULL
);
