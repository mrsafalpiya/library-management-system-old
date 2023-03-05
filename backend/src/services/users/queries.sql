/* @name getStudentName */
SELECT students.name
FROM students
WHERE students.id = :studentID;
