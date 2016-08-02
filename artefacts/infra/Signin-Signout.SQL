/*
Created: 01/08/2016
Modified: 01/08/2016
Project: CS Node Chagellenge
Model: cs_signin_signup
Company: Concrete Solutions
Author: Diego Ramos
Version: 0.0.1
Database: PostgreSQL 9.0
*/



-- Create tables section -------------------------------------------------

-- Table user

CREATE TABLE "user"(
 "id" UUID NOT NULL,
 "name" Character varying(50) NOT NULL,
 "email" Character varying(100) NOT NULL,
 "password" Varchar NOT NULL,
 "register_date" Date DEFAULT NOW() NOT NULL,
 "last_update" Date
)
WITH (OIDS=FALSE)
;

-- Add keys for table user

ALTER TABLE "user" ADD CONSTRAINT "pk_user" PRIMARY KEY ("id")
;

ALTER TABLE "user" ADD CONSTRAINT "user_email" UNIQUE ("email")
;

-- Table user_phone

CREATE TABLE "user_phone"(
 "id" Serial NOT NULL,
 "user_id" UUID NOT NULL,
 "phone" Character varying(9) NOT NULL,
 "ddd" Character varying(2) NOT NULL
)
WITH (OIDS=FALSE)
;

-- Add keys for table user_phone

ALTER TABLE "user_phone" ADD CONSTRAINT "pk_user_phone" PRIMARY KEY ("id")
;

-- Table session

CREATE TABLE "session"(
 "id" Serial NOT NULL,
 "user_id" UUID NOT NULL,
 "token" UUID NOT NULL,
 "time" Timestamp with time zone DEFAULT NOW() NOT NULL
)
WITH (OIDS=FALSE)
;

-- Add keys for table session

ALTER TABLE "session" ADD CONSTRAINT "pk_session" PRIMARY KEY ("id")
;

-- Create relationships section ------------------------------------------------- 

ALTER TABLE "user_phone" ADD CONSTRAINT "fk_phone_user" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "session" ADD CONSTRAINT "fk_user_session" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
;







