import { Fragment, React, useEffect, useState } from "react";
import StuffList from "../components/Stuff/StuffList/StuffList";
import { useHttpRequest } from "../hooks/http-hook";
import Loader from "../ui/Loader/Loader";
import ErrorModal from "../ui/ErrorModal/ErrorModal";

export default function RandomStuffPage() {
  const [loadedItems, setLoadedItems] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  useEffect(() => {
    const getAllItems = async () => {
      const resData = await sendRequest("http://localhost:5000/api/items");
      console.log(resData);
      setLoadedItems(resData);
    };

    try {
      getAllItems();
    } catch (err) {}
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <h2>Random Stuff</h2>
      {loadedItems && <StuffList items={loadedItems} />}
    </Fragment>
  );
}
