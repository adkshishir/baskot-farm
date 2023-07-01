import {
  fetchData,
  insertData,
  updateRate,
  updateOrInsertData,
} from "./curd_operation.js";
import securityController from "../Aurthentication/controller.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import {
  selectFarmers,
  selectFreshHouse,
  selectStockRecords,
  selectStocks,
  selectPayment,
  selectSecurity,
} from "../db/db_select_values.js";
import {
  receiveFarmers,
  receiveFreshHouse,
  sellFarmers,
  sellFreshHouse,
  stockAdd,
  stockRecords,
  paymentsInsert,
  payStocks,
} from "../db/db_insert_query.js";
import { update_rate, update_or_insert } from "../db/db_update.js";
const sqlLite = sqlite3.verbose();
//open database
const db = await open({
  filename: "mydatabase.db",
  driver: sqlLite.Database,
});

//data controller to the database
const getFarmers = (req, res) => {
  fetchData(db, selectFarmers, res);
};
const getFreshHouse = (req, res) => {
  fetchData(db, selectFreshHouse, res);
};
const getStockShow = (req, res) => {
  fetchData(db, selectStocks, res);
};
const getStockRecords = (req, res) => {
  fetchData(db, selectStockRecords, res);
};

const postFarmers = (req, res) => {
  {
  }
};
const getPayment = (req, res) => {
  fetchData(db, selectPayment, res);
};
const postFreshHouse = (req, res) => {
  try {
  } catch (error) {}
  res.send("postFreshHouse");
};
const getSecurity = (req, res) => {
  const securityController = async (db, res) => {
    const isPasswordSet = await db.get(
      `select count(*) as count from security_table`
    );
    const set = isPasswordSet.count > 0;
    !set ? res.json("set_Password") : res.json("login");
  };
  securityController(db, res);
};
const postReceiveFarmers = (req, res) => {
  const { name, amount, b_number, particulars } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: "",
    type: "cr",
    b_number: b_number,
    particulars: particulars,
    dr_amount: "",
    cr_amount: amount,
    item_quality: "",
    item_quantity: 0,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
  ];
  insertData(db, receiveFarmers, values, res);
};
const postReceiveFreshHouse = (req, res) => {
  const { name, amount, b_number, particulars } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: "",
    type: "cr",
    rate: 0,
    b_number: b_number,
    particulars: particulars,
    dr_amount: "",
    cr_amount: amount,
    item_quality: "",
    item_quantity: 0,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
  ];
  insertData(db, receiveFreshHouse, values, res);
};
const postSellFarmers = (req, res) => {
  const {
    name,
    amount,
    weight,
    quantity,
    billNo,
    quality,
    particulars,
    rate,
    date,
  } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: weight,
    type: "dr",
    b_number: billNo,
    particulars: particulars,
    dr_amount: amount,
    cr_amount: "",
    item_quality: quality,
    item_quantity: quantity,
    date: date,
    rate: rate,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
    data.date,
    data.rate,
  ];
  updateOrInsertData(
    db,
    update_or_insert,
    particulars,
    quantity,
    rate,
    quality,
    false,
    res
  );
  insertData(db, sellFarmers, values, res);
};

const postSellFresHouse = (req, res) => {
  const {
    name,
    amount,
    weight,
    quantity,
    billNo,
    quality,
    particulars,
    rate,
    date,
  } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: weight,
    type: "dr",
    b_number: billNo,
    particulars: particulars,
    dr_amount: amount,
    cr_amount: "",
    item_quality: quality,
    item_quantity: quantity,
    date: date,
    rate: rate,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
    data.date,
    data.rate,
  ];
  insertData(db, sellFreshHouse, values, res);
  // console.log(particulars, quantity, rate, quality);
  updateOrInsertData(
    db,
    update_or_insert,
    particulars,
    quantity,
    rate,
    quality,
    false,
    res
  );
};
const postAddNewRate = (req, res) => {
  const { rate, quality, name } = req.body;
  const value = [rate, name, quality];
  updateRate(db, update_rate, value, res);
};
const postStockAdd = (req, res) => {
  const {
    name,
    quantity,
    weight,
    companyName,
    billNo,
    rate,
    quality,
    otherInfo,
    date,
    type,
    dr_amount,
    cr_amount,
  } = req.body;
  const values = [
    name,
    quantity,
    weight,
    companyName,
    billNo,
    rate,
    quality,
    otherInfo,
    date,
    type,
    dr_amount,
    cr_amount,
  ];
  insertData(db, stockAdd, values, res);
  updateOrInsertData(
    db,
    update_or_insert,
    name,
    quantity,
    rate,
    quality,
    true,
    res
  );
};
const postPayFarmers = (req, res) => {
  const { name, amount, b_number, particulars } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: "",
    type: "dr",
    b_number: b_number,
    particulars: particulars,
    dr_amount: amount,
    cr_amount: "",
    item_quality: "",
    item_quantity: 0,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
  ];
  insertData(db, receiveFarmers, values, res);
};
const postPayFreshHouse = (req, res) => {
  const { name, amount, b_number, particulars } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: "",
    type: "dr",
    rate: 0,
    b_number: b_number,
    particulars: particulars,
    dr_amount: amount,
    cr_amount: "",
    item_quality: "",
    item_quantity: 0,
  };
  const values = [
    data.name,
    data.type,
    data.particulars,
    data.weight,
    data.dr_amount,
    data.cr_amount,
    data.item_quantity,
    data.b_number,
    data.item_quality,
  ];
  insertData(db, receiveFreshHouse, values, res);
};
const postPayStock = (req, res) => {
  const { name, amount, b_number, particulars, date } = req.body;
  const data = {
    name: particulars,
    quantity: "",
    weight: "",
    companyName: name,
    billno: b_number,
    rate: "",
    quality: "",
    otherInfo: "",
    date: date,
    type: "dr",
    amount: amount,
    dr_amount: amount,
    cr_amount: "",
  };
  const values = [
    data.name,
    data.quantity,
    data.weight,
    data.companyName,
    data.billno,
    data.rate,
    data.quality,
    data.otherInfo,
    data.date,
    data.type,
    data.amount,
    data.dr_amount,
    data.cr_amount,
  ];
  insertData(db, payStocks, values, res);
};
const payments = (req, res) => {
  const { name, particulars, amount, billNo, date } = req.body;
  const values = [name, particulars, amount, billNo, date];
  insertData(db, paymentsInsert, values, res);
};
const security = (req, res) => {
  const { name, password } = req.body;
  securityController(db, name, password, res);
};
export {
  getFarmers,
  getFreshHouse,
  getStockRecords,
  getStockShow,
  getPayment,
  getSecurity,
  postAddNewRate,
  postFarmers,
  postFreshHouse,
  postReceiveFarmers,
  postReceiveFreshHouse,
  postSellFarmers,
  postSellFresHouse,
  postStockAdd,
  payments,
  security,
  postPayFarmers,
  postPayFreshHouse,
  postPayStock,
};
