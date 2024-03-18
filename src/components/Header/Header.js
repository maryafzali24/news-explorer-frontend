import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";

import "./Header.css";

const Header = ({
  onSignInClick,
  handleSearchSubmit,
  isLoggedIn,
  onLogOut,
  updateKeyword,
}) => {
  return (
    <div className="header">
      <NavBar
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
      />
      <Search
        handleSearchSubmit={handleSearchSubmit}
        updateKeyword={updateKeyword}
      />
    </div>
  );
};

export default Header;
