import { insertData } from "../controllers/curd_operation.js";
import { passwordsInsert } from "../db/db_insert_query.js";
import { decryptPassword, encryptPassword } from "./encryptFunction.js";
import { mySecretCode } from "./serectCode.js";
//sign up
const setPassword = (db, name, password, res) => {
  let hashPassword;
  hashPassword = encryptPassword(password, mySecretCode);

  const values = [name, hashPassword];
  insertData(db, passwordsInsert, values, res);
};
//login
const verify = async (db, name, password, res) => {
  const result = await db.get(`select * from security_table where id=1`);

  result.name === name &&
  result.password &&
  decryptPassword(result.password, mySecretCode) === password
    ? res.send("loggedin")
    : res.send("login failed");
  !result.password && res.send("invalid password");
};

//if there is password already exist then login else set password
const securityController = async (db, name, password, res) => {
  const isPasswordSet = await db.get(
    `select count(*) as count from security_table`
  );
  const set = isPasswordSet.count > 0;
  if (set) {
    verify(db, name, password, res);
  } else {
    setPassword(db, name, password, res);
  }
};
export default securityController;
