import React, { Fragment, useState } from "react";

import classes from "./StuffItem.module.css";
import Card from "../../../ui/Card/Card";
import Modal from "../../../ui/Modal/Modal";
import StuffDetails from "../StuffDetails/StuffDetails";
export default function StuffItem(props) {
  const [showDetailsComponnet, setShowDetailsComponnet] = useState(false);

  const openDetailsComponnet = () => {
    setShowDetailsComponnet(true);
  };
  const closeDetailsComponnet = () => {
    setShowDetailsComponnet(false);
  };

  return (
    <Fragment>
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h2>{props.title}</h2>
          </div>
          <div className={classes.image}>
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className={classes.content}>
            <div>
              <p>{props.description}</p>
            </div>
            <div>{props.address}</div>
          </div>
          <div className={classes.actions}>
            <button onClick={openDetailsComponnet}>Details</button>
          </div>
        </Card>
      </li>

      <Modal
        show={showDetailsComponnet}
        onCancel={closeDetailsComponnet}
        header={props.title}
        contentClass={classes.content}
        footerClass={classes.actions}
        footer={<button onClick={closeDetailsComponnet}>Close</button>}
      >
        <StuffDetails
          image={props.image}
          address={props.address}
          description={props.description}
          location={props.location}
          owner={props.owner}
        />
      </Modal>
    </Fragment>
  );
}
