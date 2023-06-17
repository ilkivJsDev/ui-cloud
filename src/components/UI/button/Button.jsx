import React from "react";
import "./button.scss";

export const Button = ({ children, onClick, subClassName }) => {
  return (
    <button className={`button ${subClassName}`} onClick={onClick}>
      {children}
    </button>
  );
};
