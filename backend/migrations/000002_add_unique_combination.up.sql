ALTER TABLE "reservations"
ADD CONSTRAINT unique_book_student_combination UNIQUE ("book_id", "student_id");

ALTER TABLE "borrows"
ADD CONSTRAINT unique_copy_student_combination UNIQUE ("copy_id", "student_id");
