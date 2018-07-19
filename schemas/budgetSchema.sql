DROP DATABASE IF EXISTS twinkle_db;
CREATE database twinkle_db;

USE twinkle_db;

CREATE TABLE inventory (
  
  item_name VARCHAR(100) NULL,
  description VARCHAR(100) NULL,
  item_number VARCHAR(100) NULL,
  in_stock DECIMAL(10,4) NULL,
  price DECIMAL(10,4) NULL
 
);