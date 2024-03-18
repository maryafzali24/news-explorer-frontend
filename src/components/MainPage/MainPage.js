import About from "../About/About";
import Header from "../Header/Header";
import NewsCardList from "../NewsCardList/NewsCardList";

const MainPage = ({
  onSignInClick,
  handleSearchSubmit,
  isLoggedIn,
  onLogOut,
  // handleSignupClick,
  activeSearch,
  cards,
  isSearchLoading,
  // handleBook,
  updateKeyword,
}) => {
  return (
    <>
      <Header
        onSignInClick={onSignInClick}
        handleSearchSubmit={handleSearchSubmit}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
        updateKeyword={updateKeyword}
      />
      {activeSearch && (
        <NewsCardList
          cards={cards}
          isLoading={isSearchLoading}
          isLoggedIn={isLoggedIn}
          // handleBook={handleBook}
          // handleSignupClick={handleSignupClick}
        />
      )}
      <About />
    </>
  );
};
export default MainPage;
