export const fetchData = async (db, select, res) => {
  try {
    const data = await db.all(select);
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error.message);
  }
};

export const insertData = async (db, insert, values, res) => {
  try {
    await db.run(insert, values);
    // console.log("data insert sucessfully in the database", values);
    res.send("done");
  } catch (error) {
    // console.error("error inserting data:", error);
    res.send("error saving");
  }
};

export const updateRate = async (db, select, values, res) => {
  try {
    await db.run(select, values);
    // console.log("data update sucessfully in the database", values[0]);
    res.send("done");
  } catch (error) {
    // console.error(error);
    res.send(error);
  }
};

export const updateOrInsertData = async (
  db,
  query,
  name,
  quantity,
  rate,
  quality,
  add,
  res
) => {
  try {
    const existingRecord = await db.get(query.select, [name, quality]);
    if (existingRecord) {
      const newQuantity = add
        ? existingRecord.quantity + Number(quantity)
        : existingRecord.quantity >= Number(quantity)
        ? existingRecord.quantity - Number(quantity)
        : existingRecord.quantity;

      await db.run(query.update, [newQuantity, name, quality]);
      // console.log(`updated quantity: ${newQuantity}`);
      if (existingRecord.quantity >= Number(quantity)) {
        // res.send("success");
      } else if (!rate || !name) {
        res.send(
          "you miss something \n first double-click which one you want to sell"
        );
      }
    } else {
      add
        ? await db.run(query.insert, [name, quantity, rate, quality])
        : console.log(`empty in the stock`);
      add ? res.send("Added ") : "";
    }
  } catch (error) {
    console.error(error);
  }
};
