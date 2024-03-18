import React from "react";
import NavBar from "../NavBar/NavBar";
// import CurrentUserContext from "../../contexts/CurrentUserContext";
// import SavedCardsContext from "../../contexts/SavedCardsContext";
import "./SavedNewsHeader.css";

const SavedNewsHeader = ({ onSignInClick, isLoggedIn, onLogOut }) => {
  // const currentUser = useContext(CurrentUserContext);
  // const savedCards = useContext(SavedCardsContext);

  // const [keyword, updatKeyword] = useState([]);
  // const [newsCards, setNewsCards] = useState([]);

  // const userData = currentUser.data ? currentUser.data : { name: "" };

  // useEffect(() => {
  //   // Calculate saved articles count
  //   setSavedArticlesCount(savedCards.length);

  //   // Extract keywords from saved articles
  //   const allKeywords = savedCards.flatMap((card) => card.keyword);
  //   const uniqueKeywords = [...new Set(allKeywords)];
  //   updatKeyword(uniqueKeywords.slice(0, 3)); // Get up to 3 keywords
  // }, [savedCards]);
  return (
    <>
      <NavBar
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
      />
      <section className="saved">
        <div className="saved__container">
          <h2 className="saved__title">Saved Articles</h2>
          <p className="saved__header">saved news</p>
          <p className="saved__words">By keywords:</p>
        </div>
      </section>
    </>
  );
};
export default SavedNewsHeader;
