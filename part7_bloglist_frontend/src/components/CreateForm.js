import React, { useState } from "react";
import propTypes from "prop-types";
import "../mdb.dark.min.css";

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const titleHandler = ({ value }) => {
    setTitle(value);
  };
  const authorHandler = ({ value }) => {
    setAuthor(value);
  };
  const urlHandler = ({ value }) => {
    setUrl(value);
  };

  const createBlogHandler = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card p-3">
            <div className="card-header">
              <h2>New Blog</h2>
            </div>
            <div className="card-body">
              <form className="form">
                <p>
                  <label htmlFor="title" className="form-label text-capitalize">
                    title{" "}
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={({ target }) => titleHandler(target)}
                    className="form-control"
                  ></input>
                </p>
                <p>
                  <label
                    htmlFor="author"
                    className="form-label text-capitalize"
                  >
                    author{" "}
                  </label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={({ target }) => authorHandler(target)}
                    className="form-control"
                  ></input>
                </p>
                <p>
                  <label htmlFor="url" className="form-label text-capitalize">
                    url{" "}
                  </label>
                  <input
                    id="url"
                    type="text"
                    name="url"
                    value={url}
                    onChange={({ target }) => urlHandler(target)}
                    className="form-control"
                  ></input>
                </p>
                <p>
                  <button
                    id="createBtn"
                    onClick={(e) => createBlogHandler(e)}
                    className="btn btn-primary"
                  >
                    Create
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateForm.propTypes = {
  createBlog: propTypes.func.isRequired,
};

export default CreateForm;
