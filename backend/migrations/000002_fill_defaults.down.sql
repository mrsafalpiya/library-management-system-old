-- Delete sensible default id types
DELETE FROM id_types
WHERE id_type IN (
	'Student',
	'Staff',
	'Teacher'
);

-- Delete sensible default batches
DELETE from batches
WHERE name IN (
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

-- Delete sensible default books
DELETE from books
WHERE code IN (
	'AA',
	'AAA',
	'AAV1',
	'AC',
	'ACFP',
	'ADC',
	'AET',
	'AG',
	'AKS',
	'ALP',
	'ANI',
	'APC',
	'BBB',
	'BCA',
	'BCA2',
	'BD',
	'BEN',
	'BHM',
	'BHMB',
	'BL',
	'BM2',
	'BMN2',
	'BN',
	'BNR',
	'BOM',
	'BPCA',
	'BR',
	'BSS',
	'BSP1',
	'BS1',
	'BS2',
	'BSB',
	'BSK',
	'BSPPM',
	'BV',
	'CAM',
	'CAJ',
	'CAK',
	'CAPB',
	'CAPC',
	'CB',
	'CBB',
	'CBV2',
	'CC',
	'CCG',
	'CCM',
	'CCS',
	'CCWK1',
	'CCWH1',
	'CCG1',
	'CCW2',
	'CFG',
	'CG',
	'CG2',
	'CMN',
	'COMC',
	'CONP2',
	'CONPJ2',
	'CP1',
	'CP2',
	'CPB',
	'CTB11'
);

-- Delete sensible default copies
DELETE from batches
WHERE name IN (
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

-- Delete sensible default users
DELETE from users
WHERE id_num IN (
	'admin',
	'student'
);

DELETE from profiles
WHERE user_id IN (
	'1',
	'2'
);

-- Delete sensible default reservations
TRUNCATE transactions;
TRUNCATE borrows;
