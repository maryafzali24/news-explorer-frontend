import React, { useState, useContext, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import "./NewsCardList.css";

const NewsCardList = ({
  cards,
  isLoading,
  isLoggedIn,
  handleBook,
  handleSignupClick,
}) => {
  const savedCards = useContext(SavedCardsContext);

  const [visibleCards, setVisibleCards] = useState(3); // show 3 cards
  const [isAllCardsVisible, setIsAllCardsVisible] = useState(false);
  const [newsCards, setNewsCards] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleShowMore = () => {
    const nextVisibleCards = visibleCards + 3;
    setVisibleCards(nextVisibleCards);
    checkAllCard();
  };

  const checkAllCard = () => {
    if (visibleCards >= 99) {
      setIsAllCardsVisible(true);
    } else {
      setIsAllCardsVisible(false);
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      // If the cards array is empty, set isEmpty state to true
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);
  // newsCards is set to the value of savedCards.
  useEffect(() => {
    setNewsCards(savedCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="news">
      {isLoading ? (
        <Preloader />
      ) : isEmpty ? (
        <PageNotFound />
      ) : (
        <>
          <h2 className="news__header">Search Results</h2>
          <ul className="news__cards">
            {cards.slice(0, visibleCards).map((card) => (
              <NewsCard
                card={card}
                key={Math.random()}
                isLoggedIn={isLoggedIn}
                isBooked={false}
                handleBook={handleBook}
                handleSignupClick={handleSignupClick}
                newsCards={newsCards}
              />
            ))}
          </ul>
          {isAllCardsVisible ? null : (
            <button className="news__show" onClick={handleShowMore}>
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default NewsCardList;
