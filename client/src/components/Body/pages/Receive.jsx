import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "../../Input";
const Receive = ({ types, active }) => {
  const [hover, setHover] = useState(active);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [b_number, setB_number] = useState(0);
  const particular = "receive";
  const handleClick = (event) => {
    event.preventDefault();
    const data = { name, amount, b_number, particulars: particular };
    axios
      .post(`http://localhost:5000/receive/${types}`, data)
      .then((res) => {
        console.log(res.data);
        alert(`"data received successfully" ${res.data}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleClick} className="block p-4 m-4 text-lg font-medium">
      <Link
        to={"/receive/farmers"}
        onClick={() => setHover(false)}
        className={`${
          !hover && "bg-red-500 text-white mx-4 p-2 border-2 rounded-lg"
        }`}
      >
        from farmer
      </Link>
      <Link
        to={"/receive/fresh-house"}
        onClick={() => setHover(true)}
        className={`${
          hover && "bg-red-500 text-white mx-4 p-2 border-2 rounded-lg"
        }`}
      >
        from Fresh house
      </Link>
      <br />
      <label>{types} Name:</label>
      <Input
        type="text"
        value={name}
        placeholder={"farmer-name"}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Amount:</label>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <label>Bill.No:</label>
      <Input
        type="number"
        value={b_number}
        onChange={(e) => setB_number(e.target.value)}
      />
      <div>
        particulars:
        <span className="px-4 py-2 m-4  rounded-lg border-2 text-lg bg-white w-fit">
          {particular}
        </span>
      </div>
      <br />{" "}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-3 m-4 rounded-lg hover:bg-blue-600"
      >
        Recevive
      </button>
    </form>
  );
};

export default Receive;
