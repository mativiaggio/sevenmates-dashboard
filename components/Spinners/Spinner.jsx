import React from "react";
import { MoonLoader } from "react-spinners";

function Spinner({ color, size }) {
  // return <MoonLoader color="#060606" size={20} />;
  return <MoonLoader color={color} size={size} />;
}

export default Spinner;
