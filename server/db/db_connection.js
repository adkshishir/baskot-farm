import createTables from "./table_create.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
const sqlLite = sqlite3.verbose();
const DB_PATH = process.env.DB_PATH ? process.env.DB_PATH : "mydatabase.db";

const connection = async () => {
  const db = await open({
    filename: DB_PATH,
    driver: sqlLite.Database,
  });
  console.log("db connection established");
  await createTables(db);
  //close the sqlite databse connection when the node.js [process is terminated]
};

export default connection;
