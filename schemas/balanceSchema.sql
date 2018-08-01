DROP DATABASE IF EXISTS allowance;
CREATE database allowance;

USE allowance;

CREATE TABLE budget (
  
  balance INTEGER(100) NULL,
  balanceDate INTEGER(100) NULL REFERENCES BUDGETS.budgetDate,
  userId VARCHAR(100) NULL REFERENCES USERS.userId
  
);