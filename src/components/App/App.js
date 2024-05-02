import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Footer from "../Footer/Footer";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SignInPopup from "../SignInPopup/SignInPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNews from "../SavedNews/SavedNews";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { getNews } from "../../utils/newsApi";
import { addArticle, getArticles, removeArticles } from "../../utils/api";
import * as auth from "../../utils/auth";
import ActivePopupContext from "../../contexts/ActivePopupContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

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
  const handleLogin = (email, password) => {
    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);

          auth
            .checkToken(data.token)
            .then((res) => {
              return res;
            })
            .then((data) => {
              setCurrentUser(data);
            })
            .then(() => {
              console.log("logged in");
              setIsLoggedIn(true);
            })
            .then(() => {
              navigate("/saved-news");
            })
            .catch((err) => console.log(err));

          getArticles(data.token).then((data) => {
            setSavedCards(data);
          });
        }
      })
      .then(() => {
        handleClosePopup();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Username or password is incorrect");
        setIsLoading(false);
      });
  };

  const handleSuccessPopup = () => {
    setActivePopup("success");
  };

  const handleRegister = (email, password, name) => {
    console.log(1);
    console.log(email, password, name);
    setIsLoading(true);
    auth
      .signup(email, password, name)
      .then((res) => {
        console.log(4);
        if (res) {
          handleSuccessPopup();
        } else {
          console.log("Not registered");
          setErrorMessage("Unsuccessful registeration");
        }
      })

      .then(() => {
        console.log(5);
        handleSuccessPopup();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("The email is already in use");
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setActiveSearch(false);
    updateKeyword("");
    setSavedCards([]);
  };

  const handleSignInClick = () => {
    console.log(1231313123);
    setActivePopup("signin");
  };

  const handleSignupClick = () => {
    setActivePopup("signup");
  };

  const handleMobileClick = () => {
    console.log("handleMobileClick");
    setActivePopup("mobile");
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

    // Simulate fetching news data
    setTimeout(() => {
      getNews(input)
        .then((data) => {
          setNewsCards(data.articles);
        })
        .then(() => {
          setIsSearchLoading(false);
        })

        .catch((error) => {
          console.error(error);
        });
    }, 1000); // Adjust the delay time as needed
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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setToken(jwt);

      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
          return res;
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .then(() => {
          getArticles(jwt).then((data) => {
            setSavedCards(data);
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const checkDuplicate = (card) => {
    if (!savedCards.some((c) => c.link === card.url)) {
      addArticle({ keyword: keyword, ...card }, token, currentUser)
        .then((data) => {
          savedCards.push(data);
        })
        .catch((e) => console.log(e));
    }
  };

  const checkDelete = (card) => {
    let article = savedCards.find((c) => c.link === card.url);

    if (article !== undefined) {
      handleDeleteArticle(article._id, card);
    }
  };

  const handleBook = (card, isSaved) => {
    isSaved ? checkDelete(card) : checkDuplicate(card);
  };

  // Function to handle article removal
  const handleDeleteArticle = (id, card) => {
    removeArticles(id, token)
      .then(() => {
        savedCards.splice(
          savedCards.findIndex(
            (c) => c.link === card.link || c.link === card.url
          ),
          1
        );
      })
      .catch((error) => {
        console.error("Error removing article:", error);
      });
  };

  return (
    <ErrorBoundary>
      <div className="page">
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
                      handleMobileClick={handleMobileClick}
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
                        token={token}
                        handleDeleteArticle={handleDeleteArticle}
                        handleMobileClick={handleMobileClick}
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
                  handleRegister={handleRegister}
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
                  handleOutClick={handleOutClick}
                  handleLoginClick={handleSignInClick}
                  handleClosePopup={handleClosePopup}
                ></ConfirmationPopup>
              )}
              {activePopup === "mobile" && (
                <MobileMenu
                  onSignInClick={handleSignInClick}
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  handleClosePopup={handleClosePopup}
                  handleOutClick={handleOutClick}
                />
              )}
            </SavedCardsContext.Provider>
          </ActivePopupContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;

// current implementation: passing arguments through the whole chain (BAD)
// better: either use the react context
// OR use the react portal
// OR both...
