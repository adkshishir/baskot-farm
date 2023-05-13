// import React, { useEffect, useState } from "react";
// import SmallBox from "./SmallBox";
import image from "../../../../chicks.png";
const Dashboard = () => {
  // const [sell, setSell] = useState("");
  // const [stock, setStock] = useState("");
  // const fetchData = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   data.map((item) => {
  //     setSell(sell + item.total);
  //   });
  //   return data;
  // };
  // useEffect(() => {
  //   setSell(fetchData("http://localhost:5000/stock/show"));
  //   console.log(sell);
  // }, []);
  return (
    <div className="  rounded-lg relative w-[100%] h-[100%] bg-black  ">
      {/* <div className="flex justify-between">
        <SmallBox value={"Receive"} className={""} />
        <SmallBox value={"Sell"} className={""} />
      </div>
      <SmallBox value={"Stock"} className={""} />
      <SmallBox value={"Grand"} className={" float-right"} /> */}
      {/* <h1 className=" z-[2] text-blue-300 w-fit mx-auto my-auto">
        BASKOT POLTERY FARM
      </h1> */}

      <img
        src={image}
        alt="chicks"
        className="w-full h-full object-cover rounded-lg bg-black opacity-60 absolute"
      />
    </div>
  );
};

export default Dashboard;
