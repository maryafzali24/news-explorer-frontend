import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../images/close.svg";
import logout from "../../images/logoutWhite.svg";
import "./MobileMenu.css";

export const MobileMenu = ({
  onSignInClick,
  isLoggedIn,
  handleLogout,
  handleClosePopup,
  handleOutClick,
}) => {
  const [loggedIn, setLoggedIn] = useState("");
  const handleLogoutClick = () => {
    handleLogout();
    handleClosePopup();
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn("loggedin");
    } else {
      setLoggedIn("loggedout");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="menu" onClick={handleOutClick}>
      <div className={`menu__container-${loggedIn}`}>
        <div className="menu_over">
          <Link
            to="/"
            className="menu__logo menu__link"
            onClick={handleClosePopup}
          >
            NewsExplorer
          </Link>
          <button className="menu__button" type="button" aria-label="close">
            <img
              className="menu__close"
              alt="close button"
              src={closeIcon}
              onClick={handleClosePopup}
            />
          </button>
        </div>
        <Link
          to="/"
          className="menu__home menu__link"
          onClick={handleClosePopup}
        >
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              to="/saved-news"
              className="menu__news menu__link"
              onClick={handleClosePopup}
            >
              Saved Articles
            </Link>
            <button className="menu__logout" onClick={handleLogoutClick}>
              Username
              <img
                className="menu__logout-img"
                src={logout}
                alt="Logout Button"
              />
            </button>
          </>
        ) : (
          <button className={`menu__signin`} onClick={onSignInClick}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
