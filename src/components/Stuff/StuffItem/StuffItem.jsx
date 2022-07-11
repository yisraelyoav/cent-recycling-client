import React, { Fragment, useState } from "react";

import classes from "./StuffItem.module.css";
import Card from "../../../ui/Card/Card";
import Modal from "../../../ui/Modal/Modal";
import StuffDetails from "../StuffDetails/StuffDetails";
import { Link } from "react-router-dom";
export default function StuffItem(props) {
  const { image, address, location, owner, description, title, id } = props;
  const [showDetailsComponnet, setShowDetailsComponnet] = useState(false);

  const openDetailsComponnet = () => {
    setShowDetailsComponnet(true);
  };
  const closeDetailsComponnet = () => {
    setShowDetailsComponnet(false);
  };

  const editItemHandler = () => {
    "";
  };

  return (
    <Fragment>
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h2>{title}</h2>
          </div>
          <div className={classes.image}>
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className={classes.content}>
            <div>
              <p>{description}</p>
            </div>
            <div>{address}</div>
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
            <Link to={`/update-item/${id}`}>
              <button onClick={editItemHandler}>Edit</button>
            </Link>
            <button>Delete</button>
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
