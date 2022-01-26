import React from "react";

const AlertBox = ({ notification }) => (
  <div style={{ ...styles }}>
    <h5>{notification}</h5>
  </div>
);

const styles = {
  padding: 5,
  border: "1px solid black",
  margin: 5,
};

export default AlertBox;
