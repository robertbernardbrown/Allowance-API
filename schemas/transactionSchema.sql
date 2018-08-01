DROP DATABASE IF EXISTS allowance;
CREATE database allowance;

USE allowance;

CREATE TABLE transactions (
  
  transactionType VARCHAR(100) NULL,
  transactionAmount DECIMAL(100) NULL,
  transactionReciept VARCHAR(100) NULL,
  transactionDate DATE(100) REFERENCES BUDGETS.budgetDate,
  userId VARCHAR(100) NULL REFERENCES USERS.userId
   
);