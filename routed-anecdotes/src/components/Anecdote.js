import React from "react";

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>has {anecdote.votes} votes</p>
    </div>
  );
};

export default Anecdote;
