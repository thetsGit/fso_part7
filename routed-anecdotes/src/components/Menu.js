import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/">
        <a href="" style={padding}>
          anecdotes
        </a>
      </Link>
      <Link to="create">
        <a href="" style={padding}>
          create new
        </a>
      </Link>
      <Link to="about">
        <a href="" style={padding}>
          about
        </a>
      </Link>
    </div>
  );
};

export default Menu;
