import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NewsCard.css";

const NewsCard = ({
  card,
  isLoggedIn,
  handleBook,
  isBooked,
  handleSignupClick,
  handleDeleteArticle,
  newsCards,
  setNewsCards,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // isSaved state is updated based on changes to the newsCards, and allowing the component to reflect whether the current card has already been saved.
  useEffect(() => {
    if (newsCards.some((c) => c.link === card.url || c.link === card.link)) {
      setIsSaved(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsCards]);

  const onEnter = () => {
    setIsHovered(true);
  };

  const onLeave = () => {
    setIsHovered(false);
  };

  const OnBookClick = () => {
    handleBook(card, isSaved);
    setIsSaved(!isSaved);
  };
  const handleDelete = () => {
    setIsVisible(false);
    handleDeleteArticle(card._id, card);
    setNewsCards(newsCards.filter((c) => c._id !== card._id));
  };

  const renderSaveButton = () => {
    if (isBooked) {
      return (
        <>
          <p
            className={`card__keyword ${
              isHovered ? "card__popout-active" : "card__popout-inactive"
            }`}
          >
            {card.keyword}
          </p>
          <p
            className={`card__popout ${
              isHovered ? "card__popout-active" : "card__popout-inactive"
            }`}
          >
            Remove from saved
          </p>
          <button
            className="card__delete"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={handleDelete}
          />
        </>
      );
    } else {
      return (
        <button
          className={`card__book  ${
            isSaved
              ? "card__book-clicked"
              : isLoggedIn
              ? "card__book-active"
              : null
          }`}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={isLoggedIn ? OnBookClick : handleSignupClick}
        />
      );
    }
  };

  return (
    <div className="card">
      {isVisible && (
        <div className="card__container">
          <Link
            to={card.url || card.link}
            className="card__link"
            target="_blank"
          >
            <img
              src={card.urlToImage || card.url}
              alt={card.title}
              className="card__image"
            />
          </Link>
          {isLoggedIn ? null : (
            <p
              className={`card__popout ${
                isHovered ? "card__popout-active" : "card__popout-inactive"
              }`}
            >
              Sign in to save articles
            </p>
          )}
          {renderSaveButton()}
        </div>
      )}
      <Link
        to={card.url || card.link}
        className="card__text-link"
        target="_blank"
      >
        <p className="card__date">
          {(card.publishedAt || card.date).slice(0, 10)}
        </p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__description">{card.description || card.text}</p>
        <h4 className="card__publisher">{card.source.name || card.source}</h4>
      </Link>
    </div>
  );
};

export default NewsCard;
