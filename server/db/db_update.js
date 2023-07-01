export const update_rate = ` update stockrecords set rate=? where name =? and quality =?`;
export const update_or_insert = {
  insert: `insert into stockrecords (name, quantity, rate, quality) values (?, ?, ?, ?)`,
  update: `update stockrecords set quantity = ? where name = ? and quality = ?`,
  select: ` select * from stockrecords where name = ? and quality = ?`,
};
