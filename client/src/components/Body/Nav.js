import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ url, value, exact }) => {
  const [hover, setHover] = useState("");
  return (
    <NavLink
      className={
        "p-3 h-fit text-lg font-semibold hover:bg-[#162e5821] border-2 shadow-md rounded-md" +
        hover
      }
      activeClassName="active"
      to={url}
      exact={exact}
    >
      {value}
    </NavLink>
  );
};

export default Nav;
