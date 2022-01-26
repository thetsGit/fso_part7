import React from "react";

const AlertBox = ({ message, type }) => {
  const className =
    type === "error" ? "alert alert-danger" : "alert alert-success";
  return (
    <div className={`${className}`} id="alertBox">
      <span>{message}</span>
    </div>
  );
};

export default AlertBox;
