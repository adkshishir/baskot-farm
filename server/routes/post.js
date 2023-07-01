import express from "express";
import {
  getFarmers,
  getFreshHouse,
  getStockRecords,
  getStockShow,
  postAddNewRate,
  postFarmers,
  postFreshHouse,
  postReceiveFarmers,
  postReceiveFreshHouse,
  postSellFarmers,
  postSellFresHouse,
  postStockAdd,
  payments,
  getPayment,
  security,
  getSecurity,
  postPayFarmers,
  postPayFreshHouse,
  postPayStock,
} from "../controllers/posts.js";

const router = express.Router();
router.get("/farmers", getFarmers);
router.get("/fresh-house", getFreshHouse);
router.get("/stock/show", getStockShow);
router.get("/stock/stockrecords", getStockRecords);
router.get("/payments/show", getPayment);
router.get("/autho", getSecurity);
router.post("/stock/add", postStockAdd);
router.post("/farmers", postFarmers);
router.post("/fresh-house", postFreshHouse);
router.post("/receive/farmers", postReceiveFarmers);
router.post("/receive/fresh-house", postReceiveFreshHouse);
router.post("/sell/farmers", postSellFarmers);
router.post("/sell/fresh-house", postSellFresHouse);
router.post("/sell/addNewRate", postAddNewRate);
router.post("/payments", payments);
router.post("/pay/farmers", postPayFarmers);
router.post("/pay/fresh-house", postPayFreshHouse);
router.post("/pay/stock-house", postPayStock);
router.post("/autho", security);

export default router;
