import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
const NewsCardListSaved = ({
  isLoggedIn,
  // newsCards,
  // setNewsCards,
  // handleDeleteClick,
}) => {
  const [newsCards, setNewsCards] = useState([]);

  return (
    <section className="news">
      <ul className="news__cards">
        {newsCards.map((card) => (
          <NewsCard
            card={card}
            key={Math.random()}
            isLoggedIn={isLoggedIn}
            isBooked={true}
            // newsCards={newsCards}
            // setNewsCards={setNewsCards}
            // handleDeleteClick={handleDeleteClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default NewsCardListSaved;
