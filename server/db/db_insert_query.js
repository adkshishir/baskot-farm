const receiveFarmers = `INSERT INTO farmers (name, type, particulars, weight, dr_amount, cr_amount, quantity, billno, item_quality)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const receiveFreshHouse = `INSERT INTO fresh_house (name, type, particulars, weight, dr_amount, cr_amount, quantity, billno, item_quality)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const sellFarmers = `INSERT INTO farmers (name, type,particulars,weight,dr_amount ,cr_amount,quantity,billno,item_quality,date,rate)
  VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

const sellFreshHouse = `INSERT INTO fresh_house (name, type,particulars,weight,dr_amount, cr_amount,quantity,billno,item_quality,date,rate)
  VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

const stockAdd = `insert into stock (particular, quantity, weight, name, billno, rate, quality, otherInfo, date,type, dr_amount, cr_amount)
 values (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;

const stockRecords = `insert into stockrecords (name, quantity, rate, quality )
values (?, ?, ?, ?)`;
const paymentsInsert = `insert into payments (name, particulars, amount, billno, date )
values (?, ?, ?, ?, ?);`;
const passwordsInsert = `insert into security_table (name, password)
values (?, ?)`;
const payStocks = `insert into stock (particular, quantity,weight, name, billno, rate, quality,otherInfo, date,type,amount ,dr_amount, cr_amount)
values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
export {
  receiveFarmers,
  receiveFreshHouse,
  sellFarmers,
  sellFreshHouse,
  stockAdd,
  stockRecords,
  paymentsInsert,
  passwordsInsert,
  payStocks,
};
