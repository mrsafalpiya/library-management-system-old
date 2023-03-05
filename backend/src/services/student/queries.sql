/* @name getStudentDashboardProfile */
SELECT students.name, students.id_num, batches.name as batch
FROM students
LEFT OUTER JOIN batches ON batches.id = students.batch_id
WHERE students.id = :studentID;

/* @name getStudentDashboardTransactions */
SELECT transactions.transaction_type, books.title, created_at
FROM transactions
JOIN copies ON copies.id = transactions.copy_id
JOIN books ON books.id = copies.book_id
WHERE student_id = :studentID
ORDER BY transactions.id DESC
LIMIT 4;

/* @name getStudentDashboardBorrows */
SELECT copies.register_id, books.title, books.author, books.publisher, borrows.created_at as issue_date
FROM borrows
JOIN copies ON copies.id = borrows.copy_id
JOIN books ON books.id = copies.book_id
WHERE borrows.student_id = :studentID
ORDER BY issue_date DESC;

/* @name getStudentTransactions */
SELECT transactions.transaction_type as type, books.title as book_name, created_at as date_time
FROM transactions
JOIN copies ON copies.id = transactions.copy_id
JOIN books ON books.id = copies.book_id
WHERE student_id = :studentID AND transaction_type ~* :transactionType
ORDER BY created_at desc
LIMIT :limit
OFFSET :offset;

/* @name getStudentTransactionsCount */
SELECT COUNT(*)
FROM transactions
JOIN copies ON copies.id = transactions.copy_id
JOIN books ON books.id = copies.book_id
WHERE student_id = :studentID AND transaction_type ~* :transactionType;
