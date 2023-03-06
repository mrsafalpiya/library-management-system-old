ALTER TABLE "reservations"
ADD CONSTRAINT unique_book_student_combination UNIQUE ("book_id", "student_id");
