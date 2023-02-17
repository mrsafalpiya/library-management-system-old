CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "id_type_id" bigint,
  "id_num" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "password_hashed" varchar NOT NULL
);

CREATE TABLE "id_types" (
  "id" bigserial PRIMARY KEY,
  "id_type" varchar NOT NULL
);

CREATE TABLE "profiles" (
  "id" bigserial PRIMARY KEY,
  "user_id" bigint,
  "address" varchar,
  "city" varchar,
  "state" varchar,
  "contact" varchar,
  "email" varchar UNIQUE,
  "batch_id" bigint
);

CREATE TABLE "batches" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL
);

CREATE TABLE "books" (
  "id" bigserial PRIMARY KEY,
  "code" varchar NOT NULL,
  "title" varchar NOT NULL,
  "author" varchar,
  "publisher" varchar
);

CREATE TABLE "copies" (
  "id" bigserial PRIMARY KEY,
  "register_id" varchar NOT NULL,
  "book_id" bigint
);

CREATE TABLE "reservations" (
  "id" bigserial PRIMARY KEY,
  "book_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "borrows" (
  "id" bigserial PRIMARY KEY,
  "copy_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "transactions" (
  "id" bigserial PRIMARY KEY,
  "transaction_type" varchar NOT NULL,
  "copy_id" bigint NOT NULL,
  "user_id" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "copies" ("book_id");

CREATE INDEX ON "reservations" ("book_id");

CREATE INDEX ON "reservations" ("user_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id_type_id") REFERENCES "id_types" ("id") ON DELETE SET NULL;

ALTER TABLE "profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "profiles" ADD FOREIGN KEY ("batch_id") REFERENCES "batches" ("id") ON DELETE SET NULL;

ALTER TABLE "copies" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;

ALTER TABLE "reservations" ADD FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE CASCADE;

ALTER TABLE "reservations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "transactions" ADD FOREIGN KEY ("copy_id") REFERENCES "copies" ("id") ON DELETE CASCADE;

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
