import React, { useContext } from "react";
import "./NavBar.css";
import logout from "../../images/logout.svg";
// import logoutWhite from "../../images/logoutWhite.svg";
// import ActivePopupContext from "../../contexts/ActivePopupContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { Link } from "react-router-dom";

const NavBar = ({ onSignInClick, isLoggedIn, onLogOut }) => {
  // const activePopup = useContext(ActivePopupContext);
  const currentUser = useContext(CurrentUserContext);

  const userData = currentUser.data ? currentUser.data : { name: "" };
  return (
    <nav className="nav">
      <Link to="/" className="nav__logo nav__link nav__link-active">
        NewsExplorer
      </Link>

      <div className="nav__right">
        <Link to="/" className={`nav__home nav__link  nav__link-active`}>
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link className="nav__articles nav__link" to="/saved-news">
              Saved articles
            </Link>
            <button
              type="button"
              className="nav__logout-button nav__button"
              onClick={onLogOut}
            >
              {userData.name}
              <img
                className="nav__logout-image"
                src={logout}
                alt="Logout button"
              />
            </button>
          </>
        ) : (
          <button className="nav__signin" onClick={onSignInClick}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
