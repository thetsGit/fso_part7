import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    console.log("Use effect ran!!!");
    axios
      .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then((res) => {
        res.data.message
          ? setCountry({ found: false })
          : setCountry({ ...res.data, found: true });
      })
      .catch((e) => console.error(e.message));
  }, [name]);
  return country;
};
export default useCountry;
