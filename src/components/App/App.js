import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SignInPopup from "../SignInPopup/SignInPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import { getNews } from "../../utils/newsApi";
import ActivePopupContext from "../../contexts/ActivePopupContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";

import "./App.css";

function App() {
  const [activePopup, setActivePopup] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeSearch, setActiveSearch] = useState(false);
  const [newsCards, setNewsCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [keyword, updateKeyword] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(true);

  const handleLogout = () => {
    // setIsLoggedIn(false);
    // setCurrentUser({});
    // localStorage.removeItem("jwt");
    // setActiveSearch(false);
    // setKeyword("");
    // setSavedCards([]);
  };

  const handleSignInClick = () => {
    setActivePopup("signin");
  };

  const handleSignupClick = () => {
    setActivePopup("signup");
  };

  const handleOutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleClosePopup();
    }
  };

  const handleClosePopup = () => {
    setActivePopup("");
  };

  const handleSearchSubmit = (input) => {
    setActiveSearch(true);
    setIsSearchLoading(true);
    getNews(input)
      .then((data) => {
        setNewsCards(data.news);
      })
      .then(() => {
        setIsSearchLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!activePopup) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activePopup]);

  useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleDeleteClick = (cardId) => {
    const updatedNewsCards = newsCards.filter((card) => card._id !== cardId);
    setNewsCards(updatedNewsCards);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ActivePopupContext.Provider value={activePopup}>
        <SavedCardsContext.Provider value={savedCards}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <MainPage
                  onSignInClick={handleSignInClick}
                  handleSearchSubmit={handleSearchSubmit}
                  isLoggedIn={isLoggedIn}
                  onLogOut={handleLogout}
                  // handleSignupClick={handleSignupClick}
                  activeSearch={activeSearch}
                  cards={newsCards}
                  isSearchLoading={isSearchLoading}
                  updateKeyword={updateKeyword}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    onSignInClick={handleSignInClick}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    newsCards={savedCards}
                    setNewsCards={setSavedCards}
                    handleDeleteClick={handleDeleteClick}
                  />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
          <Footer />
          {activePopup === "signup" && (
            <SignUpPopup
              handleClosePopup={handleClosePopup}
              handleOutClick={handleOutClick}
              handleLoginClick={handleSignInClick}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {activePopup === "signin" && (
            <SignInPopup
              hanldeClosePopup={handleClosePopup}
              handleOutClick={handleOutClick}
              handleSignupClick={handleSignupClick}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {activePopup === "success" && (
            <ConfirmationPopup
              onClose={handleClosePopup}
              handleOutClick={handleOutClick}
              handleLoginClick={handleSignInClick}
            ></ConfirmationPopup>
          )}
        </SavedCardsContext.Provider>
      </ActivePopupContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

// current implementation: passing arguments through the whole chain (BAD)
// better: either use the react context
// OR use the react portal
// OR both...
