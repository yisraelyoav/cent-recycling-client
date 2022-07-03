import { Fragment, React, useEffect, useState } from "react";
import StuffList from "../components/Stuff/StuffList/StuffList";
import axios from "axios";
import Loader from "../ui/Loader/Loader";
import ErrorModal from "../ui/ErrorModal/ErrorModal";

export default function RandomStuffPage() {
  const [loadedItems, setLoadedItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequestClient = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:5000/api/items");
      const resData = await res.data;
      console.log(resData);
      setLoadedItems(resData);
      setIsLoading(false);
      if (!res.ok) {
        throw new Error(resData.message);
      }
    };

    try {
      sendRequestClient();
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  const ErrorHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={ErrorHandler} />
      {isLoading && <Loader asOverlay />}
      <h2>Random Stuff</h2>
      {loadedItems && <StuffList items={loadedItems} />}
    </Fragment>
  );
}
