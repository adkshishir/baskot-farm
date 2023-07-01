//imports tables to create
import {
  farmers,
  stock,
  stockrecords,
  freshHouse,
  payments,
  passwordTable,
} from "./db_tables.js";

const createTables = async (db) => {
  try {
    await db.exec(farmers);
    await db.exec(stock);
    await db.exec(stockrecords);
    await db.exec(freshHouse);
    await db.exec(payments);
    await db.exec(passwordTable);
  } catch (err) {
    console.error("error creating tables:", err);
  }
};

export default createTables;
