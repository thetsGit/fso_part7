import { useState } from "react";

const useUpdate = () => {
  const [id, setId] = useState(0);
  const [mode, setMode] = useState("create");

  const handleUpdate = (e, id, items, setters) => {
    e.preventDefault();
    setMode("update");
    setId(id);
    const item = items.find((item) => item.id === id);
    setters.forEach((setter) => {
      setter.setFn(item[setter.field]);
    });
  };

  return {
    handleUpdate,
    mode,
    setMode,
    id,
  };
};

export default useUpdate;
