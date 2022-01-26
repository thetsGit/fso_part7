import blogService from "../services/blogs";
import commentService from "../services/comments";
import { addBlog } from "./userReducer";

const initiateBlogsCreator = (blogs) => {
  return {
    type: "INITIATE",
    data: blogs,
  };
};

export const initiateBlogs = () => {
  return async (dispatch) => {
    const res = await blogService.getAll();
    dispatch(initiateBlogsCreator(res));
  };
};

const createOneCreator = (blog) => {
  return {
    type: "CREATE",
    data: blog,
  };
};

export const createOne = (blog, username) => {
  return async (dispatch) => {
    const res = await blogService.postOne(blog);
    dispatch(createOneCreator(res));
    dispatch(addBlog({ user: username, blog: res }));
  };
};
const updateOneCreator = (blog) => {
  return {
    type: "UPDATE",
    data: blog,
  };
};

export const updateOne = (blogId, blogObj) => {
  return async (dispatch) => {
    const res = await blogService.putOne(blogId, blogObj);
    dispatch(updateOneCreator(res));
  };
};

const deleteOneCreator = (id) => {
  return {
    type: "DELETE",
    id: id,
  };
};

export const deleteOne = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id);
    dispatch(deleteOneCreator(id));
  };
};

const addCommentCreator = (comment) => ({
  type: "ADD_COMMENT_TO_BLOG",
  data: comment,
});

export const addComment = (comment) => {
  return async (dispatch) => {
    const newComment = await commentService.postOne(comment);
    dispatch(addCommentCreator(newComment));
  };
};

const BlogReducer = (state = [], action) => {
  if (action.type === "INITIATE") {
    return action.data;
  }
  if (action.type === "CREATE") {
    return [...state, action.data];
  }
  if (action.type === "UPDATE") {
    return state.map((blog) =>
      blog.id === action.data.id ? action.data : blog
    );
  }
  if (action.type === "DELETE") {
    return state.filter((blog) => blog.id !== action.id);
  }
  if (action.type === "ADD_COMMENT_TO_BLOG") {
    return state.map((blog) =>
      blog.id === action.data.blog
        ? { ...blog, comments: [...blog.comments, action.data] }
        : blog
    );
  }
  return state;
};
export default BlogReducer;
