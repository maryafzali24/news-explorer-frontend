import React from "react";
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
  const [isShown, setIsShown] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isSaved, setIsSaved] = React.useState(false);

  const onEnter = () => {
    setIsShown(true);
  };

  const onLeave = () => {
    setIsShown(false);
  };

  const onBookClick = () => {
    handleBook(card, isSaved);
    setIsSaved(!isSaved);
  };

  const handleDelete = () => {
    handleDeleteArticle(card._id, card);
    setIsVisible(false);
    setNewsCards(
      newsCards.filter((c) => {
        if (c._id === card._id) {
          return false;
        }
        return true;
      })
    );
  };

  React.useEffect(() => {
    if (newsCards.some((c) => c.link === card.url || c.link === card.link)) {
      setIsSaved(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsCards]);

  return (
    <>
      {isVisible ? (
        <div className="card">
          <div className="card__container">
            <Link
              to={card.url ? card.url : card.link}
              className="card__link"
              target="_blank"
            >
              <img
                src={card.urlToImage ? card.urlToImage : card.image}
                alt={`${card.title}`}
                className="card__image"
              />
            </Link>
            {isLoggedIn ? null : (
              <p
                className={
                  isShown ? "card__popout-active" : "card__popout-inactive "
                }
              >
                Sign in to save articles
              </p>
            )}
            {isBooked ? (
              <>
                <p className="card__keyword">{card.keyword}</p>
                <p
                  className={
                    isShown ? "card__popout-active" : "card__popout-inactive "
                  }
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
            ) : (
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
                onClick={isLoggedIn ? onBookClick : handleSignupClick}
              />
            )}
          </div>
          <Link
            to={card.url ? card.url : card.link}
            className="card__text-link"
            target="_blank"
          >
            <p className="card__date">
              {card.publishedAt ? card.publishedAt : card.date}
            </p>
            <h3 className="card__title">{card.title}</h3>
            <p className="card__description">
              {card.description ? card.description : card.text}
            </p>
            <h4 className="card__publisher">
              {card.source.name ? card.source.name : card.source}
            </h4>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default NewsCard;
