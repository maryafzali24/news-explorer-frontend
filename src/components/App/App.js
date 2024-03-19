import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SignInPopup from "../SignInPopup/SignInPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import { getNews } from "../../utils/newsApi";
import { getItems, saveArticle, removeArticle } from "../../utils/api";
import { authorize, checkToken } from "../../utils/auth";
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
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    try {
      // Call the authorize function with the provided email and password
      const { token } = await authorize(email, password);

      // Set the token in the state
      setToken(token);

      // Call the checkToken function to get user data
      const user = await checkToken(token);

      // Set the current user in the state
      setCurrentUser(user);

      // Set isLoggedIn to true
      setIsLoggedIn(true);

      // Navigate to the saved articles page
      navigate("/saved-news");

      // Fetch articles using the token and set them in the state
      const articles = await getItems(token);
      setSavedCards(articles);

      // Close any open popups
      handleClosePopup();
    } catch (error) {
      console.error(error);
      // Handle authentication error
      setErrorMessage("Username or password is incorrect");
      setIsLoading(false);
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setToken("");
    setActiveSearch(false);
    updateKeyword("");
    setSavedCards([]);
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

  const checkDuplicate = (card) => {
    if (!savedCards.some((c) => c.link === card.url)) {
      saveArticle({ keyword: keyword, ...card }, token, currentUser);
      savedCards.push(card);
    }
  };

  const checkDelete = (card) => {
    let article = savedCards.find((c) => c.link === card.url);

    if (article !== undefined) {
      handleDeleteClick(article._id, card);
    }
  };

  const handleBook = (card, isSaved) => {
    isSaved ? checkDelete(card) : checkDuplicate(card);
  };

  const handleDeleteClick = (id, card) => {
    removeArticle(id);
    const updatedSavedCards = savedCards.filter(
      (c) => c.link !== card.link && c.link !== card.url
    );
    setSavedCards(updatedSavedCards);
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
                  handleSignupClick={handleSignupClick}
                  activeSearch={activeSearch}
                  cards={newsCards}
                  isSearchLoading={isSearchLoading}
                  handleBook={handleBook}
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
                    onLogOut={handleLogout}
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
              handleLogin={handleLogin}
              handleSignupClick={handleSignInClick}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
          {activePopup === "signin" && (
            <SignInPopup
              hanldeClosePopup={handleClosePopup}
              handleOutClick={handleOutClick}
              handleLogin={handleLogin}
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
