CREATE TABLE "students" (
  "id" bigserial PRIMARY KEY,
  "id_num" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "password_hashed" varchar NOT NULL,
  "address" varchar NOT NULL,
  "contact" varchar NOT NULL,
  "email" varchar NOT NULL,
  "batch_id" bigint NOT NULL
);

CREATE TABLE "batches" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "books" (
  "id" bigserial PRIMARY KEY,
  "title" varchar NOT NULL,
  "author" varchar NOT NULL,
  "publisher" varchar NOT NULL
);

CREATE TABLE "copies" (
  "id" bigserial PRIMARY KEY,
  "register_id" varchar NOT NULL,
  "book_id" bigint NOT NULL
);

CREATE TABLE "reservations" (
  "id" bigserial PRIMARY KEY,
  "book_id" bigint NOT NULL,
  "student_id" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "borrows" (
  "id" bigserial PRIMARY KEY,
  "copy_id" bigint NOT NULL,
  "student_id" bigint NOT NULL,
  "duration_days" integer NOT NULL DEFAULT 30,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "transactions" (
  "id" bigserial PRIMARY KEY,
  "transaction_type" varchar NOT NULL,
  "copy_id" bigint NOT NULL,
  "student_id" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "students" ("id_num");

CREATE INDEX ON "students" ("name");

CREATE INDEX ON "students" ("batch_id");

CREATE INDEX ON "books" ("title");

CREATE INDEX ON "copies" ("register_id");

CREATE INDEX ON "copies" ("book_id");

CREATE INDEX ON "reservations" ("book_id");

CREATE INDEX ON "reservations" ("student_id");

CREATE INDEX ON "borrows" ("copy_id");

CREATE INDEX ON "borrows" ("student_id");

CREATE INDEX ON "transactions" ("transaction_type");

CREATE INDEX ON "transactions" ("student_id");

ALTER TABLE "students" ADD FOREIGN KEY ("batch_id") REFERENCES "batches" ("id") ON DELETE SET NULL;

ALTER TABLE "copies" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;

ALTER TABLE "reservations" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;

ALTER TABLE "reservations" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE CASCADE;

ALTER TABLE "borrows" ADD FOREIGN KEY ("copy_id") REFERENCES "copies" ("id") ON DELETE CASCADE;

ALTER TABLE "borrows" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE CASCADE;

ALTER TABLE "transactions" ADD FOREIGN KEY ("copy_id") REFERENCES "copies" ("id") ON DELETE CASCADE;

ALTER TABLE "transactions" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE CASCADE;
