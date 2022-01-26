import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import "../mdb.dark.min.css";

const Togglable = React.forwardRef((props, ref) => {
  const [showForm, setShowForm] = useState(false);
  const toggleShow = () => {
    setShowForm(!showForm);
  };
  useImperativeHandle(ref, () => ({
    toggleShow,
  }));
  return (
    <div className="container m-3">
      {showForm ? (
        <>
          <button onClick={toggleShow} className="btn btn-danger">
            close
          </button>
          {props.children}
        </>
      ) : (
        <button onClick={toggleShow} className="btn btn-success">
          {props.buttonLabel}
        </button>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
