import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LedgerTable from "./LedgerTable";
import Input from "../../Input";

const Ledger = ({ types, active }) => {
  const [data, setData] = useState([]);
  const [hover, setHover] = useState(active);
  const [selected, setSelected] = useState("");
  const [selectedName, setSelectedName] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [total, setTotal] = useState([]);

  // const [cr_total, setCrtotal] = useState(0);

  //calculating total
  const calculateTotal = () => {
    let cumulativeTotal = 0;
    const updatedTotalPrices = selectedArray.map((price) => {
      cumulativeTotal = cumulativeTotal + price.dr_amount - price.cr_amount;
      console.log({ dr: price.dr_amount, cr: price.cr_amount });
      return cumulativeTotal;
    });

    setTotal([...updatedTotalPrices]); // Use functional update
    console.log({ total });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/${types}`)
      .then((resonse) => resonse.json())
      .then((datas) => {
        setData([...datas]);
        setSelectedArray([...datas]);
        // setTotal(0);
      })
      .catch((error) => console.error(error));
    calculateTotal();
  }, [types]);
  useEffect(() => {
    calculateTotal();
  }, [data]);
  useEffect(() => {
    setSelectedArray(data.filter((i) => i.name.includes(selected)));
    calculateTotal();
  }, [selected]);
  function handleChange(event) {
    setSelected(event.target.value);
    // setSelectedArray(data.filter((i) => i.name.includes(selected)));
  }
  function TotalCalculator(dr, cr) {
    return total;
  }
  const handlePrint = () => {
    const element = document.getElementById("printTable").outerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = element;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(false);
  };
  return (
    <>
      <div className=" w-full p-2 mx-10 my-2 print:table ">
        <Link
          to={"/ledger/farmers"}
          onClick={() => setHover(false)}
          className={`${
            !hover && "bg-red-500 text-white mx-4 p-2 border-2 rounded-lg"
          }`}
        >
          farmer
        </Link>
        <Link
          to={"/ledger/fresh-house"}
          onClick={() => setHover(true)}
          className={`${
            hover && "bg-red-500 text-white mx-4 p-2 border-2 rounded-lg"
          }`}
        >
          Fresh house
        </Link>
        <button className={"mx-4"} onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="m-2 p-3 w-full h-fit border-2 ">
        <span>{types} name:</span>{" "}
        <Input
          type="text"
          value={selected}
          placeholder={types + "name"}
          onChange={handleChange}
          className="p-2 m-2 text-base"
        />
        <div className="block max-h-20 overflow-scroll bg-white m-1 p-1 w-fit border">
          {selected &&
            selectedArray.map((i, key) => (
              <div
                className=" block"
                key={key}
                onClick={() => {
                  setSelected(i.name);
                }}
              >
                {i.name}
              </div>
            ))}
        </div>
      </div>
      <table
        className="w-full border-2 border-black font-sans "
        id="printTable"
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Bill NO</th>
            <th>Particular</th>
            <th>Dr Amount</th>
            <th>Cr Amount</th>
            <th>CR/DR</th>
            <th>TOTAL</th>
            <th>Farmers Name</th>
            <th>Item Quantity</th>
            <th>Item Quality</th>
          </tr>
        </thead>
        {selectedArray.map((dt, key) => (
          <LedgerTable
            dt={dt}
            key={key}
            TotalCalculator={TotalCalculator}
            total={total[key]}
          />
        ))}
      </table>
      <div className="float-right">Total:{total[total.length - 1]}</div>
    </>
  );
};

export default Ledger;
