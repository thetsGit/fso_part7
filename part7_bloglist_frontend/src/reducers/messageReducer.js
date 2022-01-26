export const triggerShow = (message) => ({
  type: "SHOW",
  message,
});

let timer;
export const setNotification = (message) => {
  return (dispatch) => {
    clearTimeout(timer);
    dispatch(triggerShow(message));
    timer = setTimeout(() => {
      console.log("Within the timer");
      dispatch(triggerHide());
    }, 5000);
  };
};

export const triggerHide = () => {
  return {
    type: "HIDE",
  };
};

const messageReducer = (
  state = { status: 0, message: "no notification" },
  action
) => {
  if (action.type === "SHOW") {
    return action.message;
  } else if (action.type === "HIDE") {
    return { status: 0, message: "no notification" };
  } else {
    return state;
  }
};

export default messageReducer;
