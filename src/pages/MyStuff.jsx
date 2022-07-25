import { Fragment, React, useEffect, useState, useContext } from "react";

import StuffList from "../components/Stuff/StuffList/StuffList";
import { useHttpRequest } from "../hooks/http-hook";
import Loader from "../ui/Loader/Loader";
import ErrorModal from "../ui/ErrorModal/ErrorModal";
import { AuthContext } from "../context/AuthContext";

export default function MyStuff() {
  const [loadedItems, setLoadedItems] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getItemsByUserID = async () => {
      const resData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL+"api/items/byuser/" + auth.userID,
        "GET",
        null,
        {
          authorization: "Bearer " + auth.token,
        }
      );
      console.log(resData);
      setLoadedItems(resData);
    };

    try {
      getItemsByUserID();
    } catch (err) {}
  }, [auth.token, sendRequest, auth.userID]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <h2>My Stuff</h2>
      {loadedItems && <StuffList items={loadedItems} />}
    </Fragment>
  );
}
