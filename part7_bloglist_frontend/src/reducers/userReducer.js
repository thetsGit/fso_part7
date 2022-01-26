import userService from "../services/users";
export const initiateUsersCreator = (users) => ({
  type: "INITIATE_USERS",
  data: users,
});
export const initiateUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(initiateUsersCreator(users));
  };
};
export const removeBlog = (data) => ({
  type: "REMOVE_BLOG_FROM_USER",
  data,
});
export const addBlog = (data) => ({
  type: "ADD_BLOG_FROM_USER",
  data,
});
const userReducer = (state = [], action) => {
  if (action.type === "INITIATE_USERS") {
    return action.data;
  }
  if (action.type === "REMOVE_BLOG_FROM_USER") {
    return state.map((user) =>
      user.username === action.data.user
        ? {
            ...user,
            blogs: [
              ...user.blogs.filter((blog) => blog.id !== action.data.blog),
            ],
          }
        : user
    );
  }
  if (action.type === "ADD_BLOG_FROM_USER") {
    console.log("in user reducer add blog condition", action);
    return state.map((user) =>
      user.username === action.data.user
        ? { ...user, blogs: [...user.blogs, action.data.blog] }
        : user
    );
  }
  return state;
};
export default userReducer;
