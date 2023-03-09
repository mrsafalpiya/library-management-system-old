-- Remove default books
DELETE FROM "books"
WHERE "title" IN (
	'A PRATICAL BOOK OF ACCOUNTANCY AND AUDITING',
	'ACCOUNTANCY AND AUDITING',
	'ADVANCED ACCOUNTANCY VOL 1',
	'SURYA,S ADVANCED CHEMISTRY',
	'ANNOTATED CHECKLIST OF THE FLOWERING PLANTS OF NEPAL',
	'ANMOL DICTIONARY OF CHEMISTRY',
	'ANELEMENTARY ECONOMIC THEORY',
	'ALGEBRA AND GEOMETRY',
	'AAMA KO SAPANA',
	'IBM PC ASSEMBLY LANGUAGE AND PROGRAMMING',
	'ANIMALS',
	'ADVANCED PHYSICAL CHEMISTRY',
	'BANASPATI BIGYAN BOTANY',
	'A BASIC COURSE IN ACCOUNTANCY',
	'A BASIC COURSES IN ACCOUNTANCY XII',
	'BOTANY',
	'BUSINESS ENVIRONMENT IN NEPAL',
	'A BOOK ON HOTEL MANAGEMENT',
	'A BOOK ON HOTEL MANAGEMENT',
	'BEYOND LOYALTY',
	'BASIC MATHEMATICS GRADE XII',
	'BASIC MATHEMATICS GRADE: XII',
	'BIRDS OF NEPAL',
	'BATTLES OF THE NEW REPUBLIC',
	'BUSINESS ORGANIZATION AND MANAGEMENT',
	'BASIC PRICIPLES OF COST ACCOUNTING',
	'BASANTI',
	'BUSINESS STUDIES',
	'BUSINESS STUDIES',
	'BUSINESS STUDIES-I GRADE XI',
	'BUSINESS STUDIES GRADE XII',
	'BUSINESS STATISTICS',
	'BITIYA SUDHAR KARYA DAL, 2059 KO PRATIBEDAN',
	'BUSINESS STUDIES PRINCIPLES AND PRACTICE OF MANAGEMENT',
	'BIOLOGY XI',
	'COMMERCIAL ACCOUNT',
	'COST ACCOUNTING',
	'COST ACCOUNTING',
	'CLIFFS AP BIOLOGY',
	'CLIFFS AP CHEMISTRY',
	'CONCEPTS OF BIOLOGY (FOR CLASS XI)',
	'A CLASS BOOK OF BOTANY',
	'COLLEGE BOTANY VOLUME II',
	'COLLEGE CHEMISTRY',
	'CHEMICAL CALCULATIONS',
	'COMPUTER',
	'COLLEGE CHEMISTRY',
	'COMPREHENSIVE CHEMISTRY PART -1',
	'COMPREHENSIVE CHEMISTRY PART -1',
	'COMPREHENSIVE CHEMISTRY PART -1',
	'COMPREHENSIVE CHEMISTRY PART -2',
	'COACHING FOR GROWTH',
	'COMPREHENSIVE',
	'+2 CHEMISTRY VOL.1',
	'CAPITAL MARKET IN NEPAL',
	'COMPUTER CONCEPT CLASS X',
	'CONCEPTUAL PHYSICS FOR CLASS XII',
	'CONCEPTUAL PHYSICS FOR CLASS XII',
	'CONCEPTS OF PHYSICS PART 1',
	'CONCEPTS OF PHYSICS PART 2',
	'COMPUTER PROGRAMMING IN BASIC',
	'A COMPLETE TEXTBOOK OF BIOLOGY CLASS XI'
);

-- Remove default copies
DELETE FROM "copies"
WHERE "register_id" IN (
	'14257',
	'14260',
	'14262',
	'14263',
	'14258',
	'14259',
	'14267',
	'14268',
	'14270',
	'14274',
	'14275'
);

-- Remove default students
DELETE FROM "students"
WHERE "id_num" IN (
	'20-00031-5',
	'20-00032-5',
	'20-00033-5',
	'20-00034-5'
);

-- Remove default batches (Should be removed AFTER removing students)
DELETE FROM "batches"
WHERE "name" IN (
	'BBA : Batch 12',
	'BBA : Batch 13',
	'BBA : Batch 14',
	'BBA : Batch 15',
	'BBA : Batch 16',
	'BBA : Batch 17',
	'BBA : Batch 17, 2076',
	'BBA : Batch 18, 2077',
	'BBA : Batch 19, 2078',
	'BBA : Batch 20, 2079',
	'BBM : Batch 1, 2075',
	'BBM : Batch 2, 2076',
	'BBM : Batch 3, 2077',
	'BBM : Batch 4, 2078',
	'BBM : Batch 5, 2079',
	'BBS : Batch 10',
	'BBS : Batch 11',
	'BBS : Batch 12',
	'BBS : Batch 13',
	'BBS : Batch 14',
	'BBS : Batch 15',
	'BBS : Batch 15, 2076',
	'BBS : Batch 16, 2077',
	'BBS : Batch 17, 2078',
	'BBS : Batch 18, 2079',
	'BBS : Batch 19, 2080',
	'BBS : Batch 20, 2081',
	'BCA : Batch 1, 2075',
	'BCA : Batch 2, 2076',
	'BCA : Batch 3, 2077',
	'BCA : Batch 4, 2078',
	'BCA : Batch 5, 2079',
	'BIM : Batch 14',
	'BIM : Batch 15',
	'BIM : Batch 16',
	'BIM : Batch 17',
	'BIM : Batch 18',
	'BIM : Batch 19',
	'BIM : Batch 19, 2076',
	'BIM : Batch 20, 2077',
	'BIM : Batch 21, 2078',
	'BIM : Batch 22, 2079',
	'BScCSIT : 2071',
	'BScCSIT : 2072',
	'BScCSIT : 2073',
	'BScCSIT : 2074',
	'BScCSIT : 2075',
	'BScCSIT : 2076',
	'BScCSIT : 2077',
	'BScCSIT : 2078',
	'BScCSIT : 2079',
	'BScCSIT : 2080',
	'BscCsit : Batch 11, 2076',
	'Management : Batch 15, 2072',
	'Management : Batch 16, 2073',
	'Management : Batch 17, 2074',
	'Management : Batch 18, 2075',
	'Management : Batch 19, 2076',
	'Management : Batch 20, 2077',
	'Management : Batch 21, 2078',
	'Management : Batch 22, 2079',
	'Management : Batch 23, 2080',
	'MBS : Batch 2, 2076',
	'MBS : Batch 3, 2078',
	'MBS : Batch 4, 2079',
	'MBS: Batch 1,2075',
	'Science : Batch 10, 2071',
	'Science : Batch 11, 2072',
	'Science : Batch 12, 2073',
	'Science : Batch 12, 2073',
	'Science : Batch 13, 2074',
	'Science : Batch 14, 2075',
	'Science : Batch 15, 2076',
	'Science : Batch 16, 2077',
	'Science : Batch 17, 2078',
	'Science : Batch 18, 2079',
	'Science : Batch 19, 2080'
);

-- Remove default reservations
TRUNCATE TABLE "reservations";

-- Remove default transactions
DELETE FROM "transactions"
WHERE ("transaction_type", "copy_id", "student_id") IN (
	('borrow', 1, 1),
	('return', 1, 1),
	('borrow', 2, 1),
	('renew',  2, 1),
	('borrow', 3, 1),
	('borrow', 4, 1),
	('renew',  4, 1),
	('return', 2, 1),
	('return', 3, 1),
	('borrow', 5, 1),
	('borrow', 6, 1)
);

DELETE FROM "borrows"
WHERE ("copy_id", "student_id") IN (
	(4, 1),
	(5, 1),
	(6, 1)
);

DELETE FROM "transactions"
WHERE ("transaction_type", "copy_id", "student_id") IN (
	('borrow', 1, 3)
);

DELETE FROM "borrows"
WHERE ("copy_id", "student_id") IN (
	(1, 3)
);

DELETE FROM "transactions"
WHERE ("transaction_type", "copy_id", "student_id") IN (
	('borrow', 5, 4)
);

DELETE FROM "borrows"
WHERE ("copy_id", "student_id") IN (
	(5, 4)
);
