import React from "react";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const Input = ({ name, value, handleChange }) => (
  <input name={name} value={value} onChange={handleChange} />
);

const CreateNew = (props) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <Input {...content} />
        </div>
        <div>
          author
          <Input {...author} />
        </div>
        <div>
          url for more info
          <Input {...info} />
        </div>
        <button>create</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            content.reset();
            author.reset();
            info.reset();
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
