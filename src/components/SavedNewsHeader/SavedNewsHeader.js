import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import "./SavedNewsHeader.css";

const SavedNewsHeader = ({
  onSignInClick,
  isLoggedIn,
  onLogOut,
  handleMobileClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const savedCards = useContext(SavedCardsContext);

  const [keywords, updatKeyword] = useState([]);
  const [newsCards, setNewsCards] = useState([]);
  const [totalKeywordCount, setTotalKeywordCount] = useState(1);

  const userData = currentUser.data ? currentUser.data : { name: "" };

  const countAmount = (arr) => {
    const counts = arr.reduce((map, item) => {
      map.set(item, (map.get(item) || 0) + 1);
      return map;
    }, new Map());

    const sortedCounts = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    // Extract top keywords and their counts
    const keywords = sortedCounts.slice(0, 3).map(([key]) => key);
    updatKeyword(keywords);
    setTotalKeywordCount(sortedCounts.length);
  };
  useEffect(() => {
    const cardKeywords = newsCards.map((card) => card.keyword);
    countAmount(cardKeywords);
  }, [newsCards]);

  useEffect(() => {
    const uniqueSavedCards = [...new Set(savedCards.map((card) => card.title))];
    setNewsCards(
      savedCards.filter((card) => uniqueSavedCards.includes(card.title))
    );
  }, [savedCards]);

  return (
    <>
      <NavBar
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
        handleMobileClick={handleMobileClick}
        theme="dark"
        isHomeActive={false}
      />
      <section className="saved">
        <div className="saved__container">
          <p className="saved__title">Saved Articles</p>
          <h2 className="saved__header">
            {`${userData.name}, you have ${newsCards.length} saved article${
              newsCards.length === 1 ? "" : "s"
            }`}
          </h2>
          <p className="saved__words">
            By keywords:{" "}
            <span className="saved__bold">
              {keywords.length === 3
                ? `${keywords[0]}, ${keywords[1]}, and ${
                    totalKeywordCount > 3
                      ? totalKeywordCount - 2 + " more"
                      : keywords[2]
                  }`
                : keywords.length === 2
                ? `${keywords[0]} and ${keywords[1]}`
                : keywords.length === 1
                ? `${keywords[0]}`
                : null}
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default SavedNewsHeader;
