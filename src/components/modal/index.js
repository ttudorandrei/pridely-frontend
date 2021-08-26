import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "../button";
import Followers from "../followers";
import ReviewForm from "../review-form";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { followersData } = props;

  const renderBody = () => {
    if (props.name === "Followers") {
      return followersData.length > 0 ? (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Followers</h2>
          {followersData.map((follower) => {
            return (
              <Followers
                username={follower.username}
                profilePicture={follower.profilePicture}
                key={follower._id}
              />
            );
          })}
          <div id="simple-modal-description"></div>
          <Button onClick={handleClose} name="Close" />
        </div>
      ) : (
        <div style={modalStyle} className={classes.paper}>
          <div>No followers to display</div>
        </div>
      );
    } else if (props.name === "Leave Review") {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Leave A Review</h2>
          <div id="simple-modal-description">
            If you enjoyed our services, leave us a review!
          </div>
          <ReviewForm />
          <Button onClick={handleClose} name="Close" />
        </div>
      );
    } else {
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <div id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </div>
          <Button onClick={handleClose} name="Close" />
        </div>
      );
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} name={props.name} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {renderBody()}
      </Modal>
    </div>
  );
};

export default SimpleModal;
