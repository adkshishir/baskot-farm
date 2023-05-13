import axios from "axios";
import React, { useState } from "react";
import Input from "../../Input";

const Stock = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [billNo, setBillNo] = useState("");
  const [rate, setRate] = useState("");
  const [quality, setQuality] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const data = {
    name,
    quality,
    weight,
    companyName,
    billNo,
    rate,
    quantity,
    otherInfo,
  };
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:5000/stock/add", data)
      .then((res) => {
        console.log(res.data);
        alert(`data send to the server successfully`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const seeStock = async () => {
    const response = await fetch(`http://localhost:5000/stock/show`);
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <button className="float-right" onClick={seeStock}>
        see Stock
      </button>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <span>
          <div>Name</div>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </span>
        <span>
          <div>Quantity</div>

          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </span>
        <span>
          <div>weight</div>

          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </span>
        <span>
          {" "}
          <div>company Name</div>
          <Input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </span>
        <br />
        <span>
          <div>Bill No:</div>

          <Input
            type="number"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            required
          />
        </span>
        <span>
          <div>Rate</div>

          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </span>
        <span>
          <div>Quality</div>

          <Input
            type="text"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          />
        </span>
        <span>
          <div>other Informations</div>
          <Input
            type="text"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          />{" "}
          <br />
          <button type="submit">Add Stock</button>
        </span>
      </form>
    </div>
  );
};

export default Stock;
