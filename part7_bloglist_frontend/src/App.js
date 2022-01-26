import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import login from "./services/login";
import logger from "./utils/logger";
import "./app.css";
import Togglable from "./components/Togglable";
import CreateForm from "./components/CreateForm";
import LoginForm from "./components/LoginForm";
import { setNotification } from "./reducers/messageReducer";
import { addUser, removeUser } from "./reducers/currentUserReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  initiateBlogs,
  createOne,
  updateOne,
  deleteOne,
} from "./reducers/blogReducer";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import { initiateUsers, removeBlog } from "./reducers/userReducer";
import Nav from "./components/Nav";
import "./mdb.dark.min.css";
import AlertBox from "./components/AlertBox";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const togglable1 = useRef();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.message);
  const messageStatus = useSelector((state) => state.message.status);
  const blogs = useSelector((state) => state.blogs);
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);
  const routeMatchUser = useMatch("/users/:id");
  const matchUserId = routeMatchUser && routeMatchUser.params.id;
  const matchUser = users.filter((user) => user.id === matchUserId);
  const routeMatchBlog = useMatch("/blogs/:id");
  const matchBlogId = routeMatchBlog && routeMatchBlog.params.id;
  const matchBlog = blogs.filter((blog) => blog.id === matchBlogId);

  useEffect(() => {
    dispatch(initiateBlogs());
    dispatch(initiateUsers());
  }, []);
  console.log(blogs);
  useEffect(() => {
    const currentUserJson = window.localStorage.getItem("currentUser");
    if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      dispatch(addUser(currentUser));
      blogService.setToken(currentUser.token);
    }
  }, []);

  const usernameInputHandler = ({ value }) => {
    setUsername(value);
  };

  const passwordInputHandler = ({ value }) => {
    setPassword(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await login({ username, password });
      logger.info(loginRes);
      dispatch(addUser(loginRes));
      blogService.setToken(loginRes.token);
      window.localStorage.setItem("currentUser", JSON.stringify(loginRes));
      setUsername("");
      setPassword("");
      dispatch(
        setNotification({
          message: `${loginRes.name} has successfully logged in`,
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        setNotification({ message: err.response.data.error, status: "error" })
      );
    }
  };

  const logoutHandler = () => {
    window.localStorage.clear();
    dispatch(removeUser());
  };
  const createBlog = async ({ title, author, url }) => {
    try {
      // const newBlog = await blogService.postOne({ title, author, url });
      const newBlog = {
        title,
        author,
        url,
      };
      // const creator = {
      //   username: user.username,
      //   name: user.name,
      //   id: newBlog.user,
      // };
      dispatch(createOne({ ...newBlog }, currentUser.username));
      // setBlogs(blogs.concat({ ...newBlog, user: creator }));
      logger.info(newBlog);
      dispatch(
        setNotification({ message: "A blog is created", status: "success" })
      );
      togglable1.current.toggleShow();
    } catch (error) {
      logger.info("It works");
      dispatch({ message: error.response.data.error, status: "error" });
    }
  };

  const updateBlog = async (blogId, blogObj) => {
    try {
      // const newBlog = await blogService.putOne(blogId, blogObj);
      dispatch(updateOne(blogId, blogObj));
      dispatch(
        setNotification({
          message: `You liked ${blogObj.title}`,
          status: "success",
        })
      );
    } catch (error) {
      logger.error(error.message);
      dispatch(
        setNotification({ message: "Blog update fails!!!", status: "error" })
      );
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      console.log("within delete Blog");
      dispatch(deleteOne(blogId));
      dispatch(removeBlog({ blog: blogId, user: currentUser.username }));
      dispatch(
        setNotification({ message: "A blog is deleted", status: "success" })
      );
    } catch (e) {
      logger.error(e.message);
    }
  };

  const blogSort = (b1, b2) => b2.likes - b1.likes;

  if (currentUser === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        submitHandler={submitHandler}
        usernameInputHandler={usernameInputHandler}
        passwordInputHandler={passwordInputHandler}
        message={{ message, messageStatus }}
      />
    );
  }
  return (
    <div className="container-fluid">
      <Nav currentUser={currentUser} logoutHandler={logoutHandler} />
      {message !== "no notification" && (
        <AlertBox message={message} type={messageStatus} />
      )}
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="create form" ref={togglable1}>
                <CreateForm createBlog={createBlog} />
              </Togglable>
              <ul className="list-group">
                <li className="list-group-item active fs-5">All blogs</li>
                {blogs.sort(blogSort).map((blog) => (
                  <Link key={blog.id} to={`blogs/${blog.id}`}>
                    <li className="list-group-item list-group-item-action text-primary">
                      {blog.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          }
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={matchUser[0]} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={matchBlog[0]}
              updateBlog={updateBlog}
              currentUser={currentUser}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </div>
  );
};
// const blogStyle = {
//   padding: 8,
//   paddingTop: 7,
//   backgroundColor: "#C4FCEF",
//   marginBottom: 5,
//   color: "#00C9A7",
// };

export default App;
