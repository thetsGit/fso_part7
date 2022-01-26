export const addUser = (user) => ({
  type: "ADD",
  data: user,
});
export const removeUser = () => ({
  type: "REMOVE",
});
const currentUserReducer = (state = null, action) => {
  if (action.type === "ADD") {
    return action.data;
  }
  if (action.type === "REMOVE") {
    return null;
  }
  return state;
};

export default currentUserReducer;
