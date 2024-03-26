import React, { useContext } from "react";
import "./NavBar.css";
import logout from "../../images/logout.svg";
import logoutWhite from "../../images/logoutWhite.svg";
import ActivePopupContext from "../../contexts/ActivePopupContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { NavLink } from "react-router-dom";

const NavBar = ({
  onSignInClick,
  isLoggedIn,
  onLogOut,
  handleMobileClick,
  theme,
  isHomeActive,
}) => {
  const activePopup = useContext(ActivePopupContext);
  const currentUser = useContext(CurrentUserContext);

  const userData = currentUser.data ? currentUser.data : { name: "" };

  return (
    <div className={`nav nav_${theme}`}>
      <NavLink
        to="/"
        className={`nav__logo nav__link ${
          isHomeActive ? `nav__link-active` : `nav__link-inactive`
        }`}
      >
        NewsExplorer
      </NavLink>
      {activePopup === "signup" || activePopup === "login" ? null : (
        <button
          className={`nav__burger nav__burger_${theme}`}
          onClick={handleMobileClick}
        />
      )}
      <div className="nav__right">
        <NavLink
          to="/"
          className={`nav__home nav__link ${
            isHomeActive
              ? `nav__highlight-active_${theme} nav__link-active`
              : `nav__highlight-inactive_${theme} nav__link-inactive`
          }`}
        >
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/saved-news"
              className={`nav__articles nav__link ${
                isHomeActive
                  ? `nav__highlight-inactive_${theme} nav__link-inactive`
                  : `nav__highlight-active_${theme} nav__link-active`
              }`}
            >
              Saved articles
            </NavLink>
            <button
              className={`nav__logout-button nav__button_${theme}`}
              onClick={onLogOut}
            >
              {userData.name}
              <img
                src={isHomeActive ? logoutWhite : logout}
                alt="Logout Button"
                className="nav__logout-image"
              />
            </button>
          </>
        ) : (
          <button
            className={`nav__signin nav__button_${theme} nav__button`}
            onClick={onSignInClick}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
