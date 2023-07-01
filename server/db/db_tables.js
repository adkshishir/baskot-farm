const farmers = `CREATE TABLE IF NOT EXISTS farmers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type text check(type in('dr','cr')),
    particulars TEXT,
    weight FLOAT,
    dr_amount FLOAT,
    cr_amount FLOAT,
    quantity INTEGER,
    billno INTEGER,
    item_quality TEXT,
    date DATE DEFAULT (date('now')),
    rate float 
  );
  `;
const freshHouse = `CREATE TABLE IF NOT EXISTS fresh_house (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type text check(type in('dr','cr')),
    particulars TEXT,
    weight FLOAT,
    dr_amount FLOAT,
    cr_amount FLOAT,
    quantity INTEGER,
    billno INTEGER,
    item_quality TEXT,
    date DATE DEFAULT (date('now')),
    rate float 
  );
  `;
const stock = `CREATE TABLE IF NOT EXISTS stock(
    id INTEGER PRIMARY KEY,
    particular TEXT NOT NULL,
    quantity INTEGER,
    weight FLOAT,
    name TEXT NOT NULL,
    billno INTEGER,
    rate float not null, 
    quality text ,
    otherInfo TEXT,
    date DATE DEFAULT (date('now')),
    type text check(type in('dr','cr')),
    amount float,
    dr_amount float,
    cr_amount float
  );`;
const stockrecords = `create table if not exists stockrecords (
   id INTEGER primary key,
    name text not null,
    quantity INTEGER,
    rate float not null,
    quality text 
  );`;
const payments = `CREATE TABLE IF NOT EXISTS payments (
    id integer primary key,
    name text not null,
    particulars,
    amount float not null,
    billno integer,
    date Date DEFAULT (date('now'))

  );`;
const passwordTable = `create table if not exists security_table (
  id integer primary key,
  name text not null,
  password text not null
)`;

export { farmers, stockrecords, stock, freshHouse, payments, passwordTable };
