import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../images/close.svg";
import logout from "../../images/logoutWhite.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./MobileMenu.css";

export const MobileMenu = ({
  onSignInClick,
  isLoggedIn,
  handleLogout,
  handleClosePopup,
  handleOutClick,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const userData = currentUser.data ? currentUser.data : { name: "" };
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
        <div className="menu__over">
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
              {userData.name}
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
