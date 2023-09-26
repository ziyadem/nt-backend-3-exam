create database credohouse_db;

--users
DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	username VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 50 ) UNIQUE NOT NULL,
	age INTEGER NOT NULL,
	role VARCHAR ( 50 ) DEFAULT 'user',
	password text NOT NULL
);

UPDATE users
SET role = 'admin' 
WHERE email = 'ziyadem@gmail.com';


--company
DROP TABLE IF EXISTS company;
CREATE TABLE company (
	company_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	company_title VARCHAR ( 50 ) UNIQUE NOT NULL,
	company_img TEXT 
);

select * from company WHERE company_id='2e072e16-558c-42b1-ad6c-a239db5a6e70';

select * from company WHERE company_id='2e072e16-558c-42b1-ad6c-a239db5a6e70';

--complex
DROP TABLE IF EXISTS complex;
CREATE TABLE complex (
	complex_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	complex_title VARCHAR ( 50 ) UNIQUE NOT NULL,
	complex_address TEXT NOT NULL,
	company_id VARCHAR(50) NOT NULL,
	CONSTRAINT complex_company
    FOREIGN KEY(company_id) 
	REFERENCES company(company_id)
);
select cx.complex_title  FROM complex cx
    JOIN company c ON c.company_id = cx.company_id
	WHERE cx.company_id ='f96b2e2a-21b9-46c1-bc5a-59cb490cda8c';


	   select cx.complex_title  FROM company cp
     JOIN complex cx ON cp.company_id = cx.company_id
     WHERE cp.complex_id ='470f199b-77b6-44eb-bcc1-b483b230c5d0';
    

INSERT INTO complex(complex_title, complex_address, company_id) VALUES('milliy dom','nurafwon','dkuhbwoybweuyhb');


--room
DROP TABLE IF EXISTS room;
CREATE TABLE room (
	room_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	room integer   NOT NULL,
	price integer NOT NULL,
	kv integer NOT NULL,
	complex_id VARCHAR(50) NOT NULL,
	CONSTRAINT room_complex
    FOREIGN KEY(complex_id) 
	REFERENCES complex(complex_id)
);

INSERT INTO complex(complex_title, complex_address, company_id) VALUES('milliy dom','nurafwon','dkuhbwoybweuyhb');


--bank
DROP TABLE IF EXISTS bank;
CREATE TABLE bank (
	bank_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	max_sum integer   NOT NULL,
	protsen integer NOT NULL,
	bank VARCHAR(50) NOT NULL
);

INSERT INTO bank(max_sum,protsen,bank) VALUES(500000000,17,'Agrobank bank');
INSERT INTO bank(max_sum,protsen,bank) VALUES(1000000000,17,'Hamkor bank');
INSERT INTO bank(max_sum,protsen,bank) VALUES(1500000000,17,'Xalq bank');

--customers
DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
	customers_id VARCHAR(50) UNIQUE NOT NULL DEFAULT uuid_generate_v4 (),
	max_sum integer   NOT NULL,
	protsen integer NOT NULL,
	bank VARCHAR(50) NOT NULL
);

select r.room,r.room_id,r.price,r.kv,bk.bank,r.price*0.17 as startingPaymet,r.price*0.83/17 as monthPayment FROM room r
    JOIN complex c ON c.complex_id = r.complex_id
    JOIN bank b ON b.bank_id =r.bank_id
    JOIN bank bk ON bk.max_sum >r.price
	WHERE r.complex_id='b1162676-a001-4f92-98e9-7d21a5b43bce';

select  b.bank,b.protsen,r.price*b.protsen as startingPaymet,r.price*0.83/17 as monthPayment  FROM room r
    JOIN bank b ON  b.max_sum>r.price
	  WHERE r.room_id ='3f2ed348-76c5-4ecc-8ed9-b9db97e654fb';