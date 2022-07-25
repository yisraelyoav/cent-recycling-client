import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../ui/Loader/Loader";
import ErrorModal from "../ui/ErrorModal/ErrorModal";
import UpdateItemForm from "../components/Stuff/UpdateItemForm/UpdateItemForm";
export default function UpdateItemPage() {
  const [loadedItem, setLoadedItem] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const auth = useContext(AuthContext);
  const itemID = useParams().itemID;

  useEffect(() => {
    const getItemByID = async () => {
      const resData = await sendRequest(
        `${process.env_production.REACT_APP_BACKEND_URL}api/items/${itemID}`,
        "GET",
        null,
        {
          authorization: "Bearer " + auth.token,
        }
      );
      console.log(resData);
      setLoadedItem(resData);
    };

    try {
      getItemByID();
    } catch (err) {}
  }, [sendRequest, auth.token, itemID]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <h2>Update Item</h2>
      {loadedItem && <UpdateItemForm item={loadedItem} />}
    </Fragment>
  );
}
