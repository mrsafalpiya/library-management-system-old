ALTER TABLE "reservations"
DROP CONSTRAINT unique_book_student_combination;

ALTER TABLE "borrows"
DROP CONSTRAINT unique_copy_student_combination;
