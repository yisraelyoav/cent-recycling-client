import { React, useEffect, useState } from "react";
import StuffList from "../components/Stuff/StuffList/StuffList";
import axios from "axios";

export default function RandomStuffPage() {
  const [loadedItems, setLoadedItems] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get("http://localhost:5000/api/items");
      const resData = await res.data;
      console.log(resData);
      setLoadedItems(resData);
    };
    sendRequest();
    // async function conectToGoogleMapsApi() {
    //   await axios.get(
    //     `https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`
    //   );
    // }
    // conectToGoogleMapsApi();
  }, []);

  return (
    <div>
      <h2>Random Stuff</h2>
      {loadedItems && <StuffList items={loadedItems} />}
    </div>
  );
}
