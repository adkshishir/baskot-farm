import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RowForRate from "./RowForRate";
import Input from "../../Input";
const Sell = ({ types }) => {
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [weigth, setWeight] = useState(0);
  const [rate, setRate] = useState(0);
  const [b_number, setB_number] = useState(0);
  const [stock, setStock] = useState([]);
  const [refineStock, setRefineStock] = useState([]);
  const [particulars, setParticulars] = useState("");
  const [quality, setQuality] = useState("");
  const [total, setTotal] = useState(
    types === "farmers" ? quantity * rate : weigth * rate
  );
  const data = {
    name,
    amount: total,
    weigth,
    billNo: b_number,
    particulars: particulars,
    quality: quality,
    quantity,
  };
  function findParticular(pa, qty, rate) {
    setParticulars(pa);
    setQuality(qty);
    setRate(rate);
  }
  const fetchStock = async () => {
    const response = await fetch("http://localhost:5000/stock/stockrecords");
    const data = await response.json();
    setStock([...data]);

    // const updateProduct = [];
    // data.forEach((product) => {
    //   const existName = updateProduct.find((p) =>
    //     product.quality
    //       ? p.quality === product.quality
    //       : p.name === product.name
    //   );
    //   if (existName) {
    //     existName.quantity += product.quantity;
    //   } else {
    //     updateProduct.push({
    //       name: product.name,
    //       quantity: product.quantity,
    //       rate: product.rate,
    //       quality: product.quality,
    //     });
    //   }
    //   setRefineStock([...updateProduct]);
    //   console.log(updateProduct);
    //   console.log(refineStock);
    // });
  };
  useEffect(() => {
    fetchStock();
    console.log(stock);
  }, []);
  useEffect(() => {
    setTotal(types === "farmers" ? quantity * rate : weigth * rate);
  }, [quantity, weigth, rate]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/sell/${types}`, data)
      .then((res) => {
        console.log(res.data);
        alert(`"data received successfully" ${res.data}`);
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <table>
        <tr>
          <th>Item Name</th>
          <th>Available quantity</th>
          <th>Rate</th>
          <th>Quality</th>
        </tr>
        {stock.map((st, index) => (
          <RowForRate findParticular={findParticular} st={st} key={index} />
        ))}
      </table>
      <form onSubmit={handleSubmit}>
        <div>
          products:{particulars} <br />
          Quality:{quality}
        </div>
        <span>
          <span>QTY TO SELL</span>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </span>
        <span>
          <div>WEIGHT-KG</div>
          <Input
            type="number"
            value={weigth}
            onChange={(e) => setWeight(e.target.value)}
          />
        </span>
        <span>
          <div>RATE-in R.s</div>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </span>
        <span>
          <div>bill NO</div>
          <Input
            type="number"
            value={b_number}
            onChange={(e) => setB_number(e.target.value)}
          />
        </span>
        <Link to={"/sell/farmers"}>To Farmer</Link>
        <Link to={"/sell/fresh-house"}>To fresh house</Link>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 m-4 rounded-lg hover:bg-blue-600"
          onClick={() => window.location.reload(false)}
        >
          Sell
        </button>
      </form>
    </>
  );
};

export default Sell;
