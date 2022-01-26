import axios from "axios";
const baseUrl = "/api/comments";

const postOne = async (commentObj) => {
  const res = await axios.post(baseUrl, commentObj);
  return res.data;
};

export default { postOne };
