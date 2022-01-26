import React, { useState } from "react";
import logger from "../utils/logger";
import { addComment } from "../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import "../mdb.dark.min.css";

const Blog = ({ blog, updateBlog, currentUser, deleteBlog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const users = useSelector((state) => state.users);
  const currentUserId =
    users.length &&
    users.filter((user) => user.username === currentUser.username)[0].id;
  logger.info(blog);
  // const blogStyle = {
  //   padding: 8,
  //   paddingTop: 7,
  //   backgroundColor: "#C4FCEF",
  //   marginBottom: 5,
  //   color: "#00C9A7",
  // };
  const btnStyle = {
    marginLeft: 5,
    padding: 8,
    borderRadius: 5,
    cursor: "pointer",
  };
  const updateHandler = () => {
    const likes = blog.likes + 1;
    const { id, title, author, url, user } = blog;
    const userId = user.id;
    const blogObj = { title, author, likes, url, userId };
    updateBlog(id, blogObj);
  };
  const deleteHandler = () => {
    const confirm = window.confirm("Are you sure to delete?");
    confirm ? deleteBlog(blog.id) : null;
  };
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    setComment("");
    const newComment = {
      content: comment,
      user: currentUserId,
      blog: blog.id,
    };
    dispatch(addComment(newComment));
    console.log(comment);
  };
  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };
  return blog ? (
    <div className="container">
      <h2>
        <strong className="blogTitle">{blog.title}</strong>
      </h2>
      <div className="blogDetails">
        <p className="blogUrl">
          <a href={`${blog.url}`} className="btn btn-outline-info mb-3">
            read more
          </a>
        </p>
        <p className="blogLike">
          Likes:
          {blog.likes}
          <br />
          <button
            // style={{ width: 25, height: 25 }}
            onClick={updateHandler}
            className="btn btn-info fs-6 mb-3"
          >
            <FaThumbsUp />
          </button>
        </p>
        <p className="blogAuthor">{blog.author}</p>
        {currentUser.username === blog.user.username ? (
          <button
            onClick={deleteHandler}
            style={btnStyle}
            className="btn btn-danger mb-3"
          >
            remove
          </button>
        ) : null}
      </div>
      <div className="list-group">
        <h3 className="list-group-item active mb-0">comments</h3>
        <span className="list-group-item">
          <form
            onSubmit={(e) => commentSubmitHandler(e)}
            // className="d-flex align-items-start"
          >
            <input
              type="text"
              onChange={(e) => commentChangeHandler(e)}
              value={comment}
              className="form-control m-3"
            ></input>
            <button type="submit" className="btn btn-success ms-auto float-end">
              add comment
            </button>
          </form>
        </span>

        {blog.comments.map((comment) => (
          <span key={comment.id} className="list-group-item text-primary">
            {comment.content}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};

export default Blog;
