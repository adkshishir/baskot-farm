import React, { useEffect, useState } from "react";

const LedgerTable = ({ dt, TotalCalculator, total }) => {
  const [totals, settotals] = useState(total + dt.dr_amount - dt.cr_amount);
  useEffect(() => {
    settotals(TotalCalculator(dt.dr_amount, dt.cr_amount));
  }, [dt.cr_amount, dt.dr_amount]);
  return (
    <tbody>
      <tr key={dt.id}>
        <td>{dt.date}</td>
        <td>{dt.billno}</td>
        <td>{dt.particulars}</td>
        <td>{dt.dr_amount}</td>
        <td>{dt.cr_amount}</td>
        <td>{dt.type}</td>
        <td>{total}</td>
        <td>{dt.name}</td>
        <td>{dt.quantity}</td>
        <td>{dt.item_quality}</td>
      </tr>
    </tbody>
  );
};

export default LedgerTable;
