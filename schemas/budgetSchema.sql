DROP DATABASE IF EXISTS allowance;
CREATE database allowance;

USE allowance;

CREATE TABLE budget (
  
  budget INTEGER(100) NULL,
  budgetDate VARCHAR(100) NULL,
  userId VARCHAR(100) NULL REFERENCES USERS.userId
  
);