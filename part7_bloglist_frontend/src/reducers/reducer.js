import { combineReducers } from "redux";
import BlogReducer from "./blogReducer";
import messageReducer from "./messageReducer";
import currentUserReducer from "./currentUserReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  blogs: BlogReducer,
  message: messageReducer,
  currentUser: currentUserReducer,
  users: userReducer,
});
export default reducer;
