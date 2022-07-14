import { Fragment, React, useEffect, useState, useCallback } from "react";
import StuffList from "../components/Stuff/StuffList/StuffList";
import { useHttpRequest } from "../hooks/http-hook";
import Loader from "../ui/Loader/Loader";
import ErrorModal from "../ui/ErrorModal/ErrorModal";

export default function RandomStuffPage() {
  const [loadedItems, setLoadedItems] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();

  const getAllItems = useCallback(async () => {
    const resData = await sendRequest("http://localhost:5000/api/items");
    console.log(resData);
    setLoadedItems(resData);
  }, [sendRequest]);

  useEffect(() => {
    try {
      getAllItems();
    } catch (err) {}
  }, [getAllItems]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <h2>Random Recycling Stuff</h2>
      {loadedItems && (
        <StuffList items={loadedItems} onDeleteItem={getAllItems} />
      )}
    </Fragment>
  );
}
