import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data));
  }, []);
  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((res) => setResources(resources.concat(res.data)));
  };
  const update = (id, resource) => {
    axios
      .put(`${baseUrl}/${id}`, resource)
      .then((response) =>
        setResources(
          resources.map((res) => (res.id === id ? response.data : res))
        )
      );
  };

  const service = {
    create,
    update,
  };

  return [resources, service];
};

export default useResource;
