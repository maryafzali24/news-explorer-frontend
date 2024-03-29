import React from "react";
import closeBtn from "../../images/close.svg";
import "./ConfirmationPopup.css";

const ConfirmationPopup = ({ handleOutClick, handleLoginClick, onClose }) => {
  return (
    <div className="popup__confirm-container" onClick={handleOutClick}>
      <div className="popup__confirmation">
        <button className="popup__button" type="button" aria-label="close">
          <img
            src={closeBtn}
            className="popup__closeIcon"
            alt="close button"
            onClick={onClose}
          />
        </button>
        <h3 className="popup__confirm-title">
          Registration successfully completed!
        </h3>
        <button className="popup__confirm-signin" onClick={handleLoginClick}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
