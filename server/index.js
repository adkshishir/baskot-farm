const express = require("express");
const cors = require("cors");
const sqlLite = require("sqlite3").verbose();
const path = require("path");
const { error } = require("console");
const { serialize } = require("v8");
const app = express();
// const { spawn } = require("child_process");
app.use(cors());
const port = 5000;
//process.env.PORT ||
app.use(express.json());
const dbPath = path.join(__dirname + "my-database.sqlite");
const db = new sqlLite.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("connected to the database.!");
});
//create a table if no exists farmers &&fresh-house

db.run(`CREATE TABLE IF NOT EXISTS farmers (
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
  date DATE DEFAULT (datetime('now', 'localtime'))
);
`);
db.run(`CREATE TABLE IF NOT EXISTS fresh_house (
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
  date DATE DEFAULT (datetime('now', 'localtime'))
);
`);
db.run(`CREATE TABLE IF NOT EXISTS stock(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER,
  weight FLOAT,
  companyName TEXT NOT NULL,
  billno INTEGER,
  rate float not null, 
  quality text ,
  otherInfo TEXT,
  Date DATE DEFAULT (datetime('now', 'localtime'))
);`);
db.run(`create table if not exists stockrecords (
  id INTEGER primary key,
  name text not null,
  quantity INTEGER,
  rate float not null,
  quality text 
);`);

//get request
app.get("/farmers", (req, res) => {
  db.serialize(() => {
    db.all("select * from farmers", (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      res.json(rows);
    });
  });
  // res.send(datas);
});
app.get("/fresh-house", (req, res) => {
  db.serialize(() => {
    db.all("select * from fresh_house", (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      res.json(rows);
    });
  });
});
//post request
app.post("/farmers", (req, res) => {
  res.send("welcome to my end point ");
});
app.post("/fresh-house", (req, res) => {
  res.send("welcome to my end point ");
});
app.post("/receive/farmers", (req, res) => {
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
  const sql = `INSERT INTO farmers (name, type, particulars, weight, dr_amount, cr_amount, quantity, billno, item_quality)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  //execute the sql statement with the extracted data as parameters
  db.run(
    sql,
    [
      data.name,
      data.type,
      data.particulars,
      data.weight,
      data.dr_amount,
      data.cr_amount,
      data.item_quantity,
      data.b_number,
      data.item_quality,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("error inserting data into the database.");
      } else {
        console.log("data inserted successfully");
        // res.status(200).send("data inserted successfully");
      }
    }
  );
  res.send(
    `value received successfully on the sever ${data.name} ${data.amount} ${data.b_number} ${data.particulars}`
  );
});
//fro fresh house
app.post("/receive/fresh-house", (req, res) => {
  const { name, amount, b_number, particulars } = req.body;
  const data = {
    name: name,
    amount: amount,
    weight: "",
    type: "cr",
    rate: 0,
    b_number: b_number,
    particulars: "receive",
    dr_amount: "",
    cr_amount: amount,
    item_quality: "",
    item_quantity: 0,
  };
  const sql = `INSERT INTO fresh_house (name, type, particulars, weight, dr_amount, cr_amount, quantity, billno, item_quality)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  //execute the sql statement with the extracted data as parameters
  db.run(
    sql,
    [
      data.name,
      data.type,
      data.particulars,
      data.weight,
      data.dr_amount,
      data.cr_amount,
      data.item_quantity,
      data.b_number,
      data.item_quality,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("error inserting data into the database.");
      } else {
        console.log("data inserted successfully");
        // res.status(200).send("data inserted successfully");
      }
    }
  );
  res.send(
    `value received successfully on the sever ${data.name} ${data.amount} ${data.b_number} ${data.particulars}`
  );
});

//sell to farmers
app.post("/sell/farmers", (req, res) => {
  const { name, amount, weight, quantity, billNo, quality, particulars } =
    req.body;
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
  };
  const sql = `INSERT INTO farmers (name, type,particulars,weight,dr_amount ,cr_amount,quantity,billno,item_quality)
  VALUES(?,?,?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [
      data.name,
      data.type,
      data.particulars,
      data.weight,
      data.dr_amount,
      data.cr_amount,
      data.item_quantity,
      data.b_number,
      data.item_quality,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("error inserting data into the database.");
      } else {
        console.log("data inserted successfully");
      }
    }
  );
  db.get(
    `select * from stockrecords where name=? and quality=?`,
    [particulars, quality],
    (err, row) => {
      if (err) {
        console.error(err);
        return;
      } else {
        if (row) {
          //products  already exists ,update the quantity
          const newQuantity = row.quantity - quantity;
          db.run(
            `update stockrecords set quantity = ? where name =? and quality = ?`,
            [newQuantity, particulars, quality],
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                ` product  quantity updated successfully  by ${newQuantity}`
              );
            }
          );
        } else {
          // db.run(
          //   `insert into stockrecords (name,quality,quantity,rate) values (?,?,?,?)`,
          //   [name, quality, quantity, rate],
          //   (err) => {
          //     if (err) {
          //       console.error(err.message);
          //       return;
          //     }
          //     console.log(`product added to the stockrecords successfully`);
          //   }
          // );
          console.log(
            ` sry cannot sell this product is out of the stock plz choose next product`
          );
        }
      }
    }
  );
  res.send(
    `value received successfully on the server and stored in the database.`
  );
});

app.post("/sell/fresh-house", (req, res) => {
  const { name, amount, weight, quantity, billNo, quality, particulars } =
    req.body;
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
  };
  const sql = `INSERT INTO fresh_house (name, type,particulars,weight,dr_amount, cr_amount,quantity,billno,item_quality)
  VALUES(?,?,?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [
      data.name,
      data.type,
      data.particulars,
      data.weight,
      data.dr_amount,
      data.cr_amount,
      data.item_quantity,
      data.b_number,
      data.item_quality,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("error inserting data into the database.");
      } else {
        console.log("data inserted successfully");
      }
    }
  );
  db.get(
    `select * from stockrecords where name= ? and quality=?`,
    [particulars, quality],
    (err, row) => {
      if (err) {
        console.error(err);
        return;
      } else {
        if (row) {
          //products  already exists ,update the quantity
          const newQuantity = row.quantity - quantity;
          db.run(
            `update stockrecords set quantity = ? where name =? and quality = ?`,
            [newQuantity, particulars, quality],
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                ` product  quantity updated successfully  by ${newQuantity}`
              );
            }
          );
        } else {
          // db.run(
          //   `insert into stockrecords (name,quality,quantity,rate) values (?,?,?,?)`,
          //   [name, quality, quantity, rate],
          //   (err) => {
          //     if (err) {
          //       console.error(err.message);
          //       return;
          //     }
          //     console.log(`product added to the stockrecords successfully`);
          //   }
          // );
          console.error(" out of stock to sell the items");
          return;
        }
      }
    }
  );
  res.send(
    `value received successfully on the server and stored in the database.`
  );
});
app.post("/sell/addNewRate", (req, res) => {
  const { rate, quality, name } = req.body;
  db.get(
    `select * from stockrecords where name = ? and quality =?`,
    [name, quality],
    (err, rows) => {
      if (err) {
        console.error(err);
        return;
      } else {
        if (rows) {
          db.run(
            `update stockrecords set rate =? where name =? and quality = ?`,
            [rate, name, quality],
            (err) => {
              if (err) {
                console.error(err);
                return;
              } else {
                console.log("rate is updated successfully go get some rest");
              }
            }
          );
        }
      }
    }
  );
});

//get request for stock data for front end means to show the data
app.get("/stock/show", (req, res) => {
  db.serialize(() => {
    db.all("select * from stock", (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      res.json(rows);
    });
  });
});
app.get("/stock/stockrecords", (req, res) => {
  db.serialize(() => {
    db.all("select * from stockrecords", (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      res.json(rows);
    });
  });
});
//post request for stock data or to get the data from front end with the help of form
app.post("/stock/add", (req, res) => {
  const {
    name,
    quantity,
    weight,
    companyName,
    billNo,
    rate,
    quality,
    otherInformations,
  } = req.body;
  const sql = `insert into stock (name,quantity,weight,companyName,billno,rate,quality,otherInfo) values (?,?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [
      name,
      quantity,
      weight,
      companyName,
      billNo,
      rate,
      quality,
      otherInformations,
    ],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("error inserting data into the database.");
      } else {
        console.log("data inserted successfully");
      }
    }
  );
  db.get(
    `select * from stockrecords where name=? and quality=?`,
    [name, quality],
    (err, row) => {
      if (err) {
        console.error(err);
        return;
      } else {
        if (row) {
          //products  already exists ,update the quantity
          const newQuantity = row.quantity + quantity;
          db.run(
            `update stockrecords set quantity = ? where name =? and quality = ?`,
            [newQuantity, name, quality],
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                ` product  quantity updated successfully  by ${newQuantity}`
              );
            }
          );
        } else {
          db.run(
            `insert into stockrecords (name,quality,quantity,rate) values (?,?,?,?)`,
            [name, quality, quantity, rate],
            (err) => {
              if (err) {
                console.error(err.message);
                return;
              }
              console.log(`product added to the stockrecords successfully`);
            }
          );
        }
      }
    }
  );
  res.send(`stock added successfully in database`);
});
//close the sqlite databse connection when the node.js [process is terminated]
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err);
    }
    console.log("closed the sqlite database connection.!");
    process.exit(0);
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
