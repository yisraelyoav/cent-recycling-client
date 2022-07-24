import React, { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./StuffItem.module.css";
import Card from "../../../ui/Card/Card";
import Modal from "../../../ui/Modal/Modal";
import StuffDetails from "../StuffDetails/StuffDetails";
import { useHttpRequest } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/AuthContext";
import ErrorModal from "../../../ui/ErrorModal/ErrorModal";
import Loader from "../../../ui/Loader/Loader";

export default function StuffItem(props) {
  const { image, address, location, owner, description, title, id } = props;
  const { onDeleteItem } = props;
  const [showDetailsComponnet, setShowDetailsComponnet] = useState(false);
  const { isLoading, error, clearError, sendRequest } = useHttpRequest();
  const auth = useContext(AuthContext);
  const openDetailsComponnet = () => {
    setShowDetailsComponnet(true);
  };
  const closeDetailsComponnet = () => {
    setShowDetailsComponnet(false);
  };

  const deleteItemHandler = async () => {
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}api/items/${id}`,
      "DELETE",
      null,
      {
        authorization: "Bearer " + auth.token,
      }
    );
    setShowDetailsComponnet(false);
    onDeleteItem();
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h2>{title}</h2>
          </div>
          <div className={classes.image}>
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
              alt={title}
            />
          </div>
          <div className={classes.content}>
            <div>
              <p>{description}</p>
            </div>
            <div>location: {address}</div>
          </div>
          <div className={classes.actions}>
            <button onClick={openDetailsComponnet}>Details</button>
          </div>
        </Card>
      </li>

      <Modal
        show={showDetailsComponnet}
        onCancel={closeDetailsComponnet}
        header={title}
        contentClass={classes.content}
        footerClass={classes.actions}
        footer={
          <div>
            {auth.userID === owner._id && (
              <Link to={`/update-item/${id}`}>
                <button>Edit</button>
              </Link>
            )}
            {auth.userID === owner._id && (
              <button onClick={deleteItemHandler}>Delete</button>
            )}

            <button onClick={closeDetailsComponnet}>Close</button>
          </div>
        }
      >
        <StuffDetails
          image={image}
          address={address}
          description={description}
          location={location}
          owner={owner}
        />
      </Modal>
    </Fragment>
  );
}
