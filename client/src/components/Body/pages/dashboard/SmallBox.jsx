import React from "react";

const SmallBox = ({ value, className }) => {
  return (
    <div
      className={`${className} m-4 text-xl bg-white  font-medium p-6 border-2  shadow-md rounded-md w-fit `}
    >
      {value}
      <br />
      Total:{"money"}
    </div>
  );
};

export default SmallBox;
