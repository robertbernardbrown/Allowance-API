DROP DATABASE IF EXISTS allowance;
CREATE database allowance;

USE allowance;

CREATE TABLE transactions (
  
  transactionType VARCHAR(100) NULL,
  transactionAmount DECIMAL(100) NULL,
  transactionReciept VARCHAR(100) NULL
 
);