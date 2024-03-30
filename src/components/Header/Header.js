import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";

import "./Header.css";

const Header = ({
  onSignInClick,
  handleSearchSubmit,
  isLoggedIn,
  onLogOut,
  updateKeyword,
  handleMobileClick,
  theme,
  isHomeSctive,
}) => {
  return (
    <header className="header">
      <NavBar
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
        handleMobileClick={handleMobileClick}
        theme={theme}
        isHomeActive={isHomeSctive}
      />
      <Search
        handleSearchSubmit={handleSearchSubmit}
        updateKeyword={updateKeyword}
      />
    </header>
  );
};

export default Header;
