import axios from "axios";
import React, { useEffect, useState } from "react";

const RowForRate = ({ findParticular, st }) => {
  const [value, setValue] = useState(st.rate);

  const handleChange = async () => {
    axios
      .post("http://localhost:5000/sell/addNewRate", {
        quality: st.quality,
        rate: value,
        name: st.name,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <tr onDoubleClick={() => findParticular(st.name, st.quality, value)}>
      <td>{st.name}</td>
      <td>{st.quantity}</td>
      <td>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </td>
      <td>{st.quality}</td>
      <td
        onClick={handleChange}
        className=" p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 cursor-pointer border-0"
      >
        {" "}
        change rate
      </td>
    </tr>
  );
};

export default RowForRate;
