import React from "react";
import NewsCardListSaved from "../NewsCardList/NewsCardsListSaved";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

const SavedNews = ({
  onSignInClick,
  isLoggedIn,
  onLogOut,
  newsCards,
  setNewsCards,
  handleDeleteArticle,
}) => {
  return (
    <>
      <SavedNewsHeader
        onSignInClick={onSignInClick}
        isLoggedIn={isLoggedIn}
        onLogOut={onLogOut}
      />
      <NewsCardListSaved
        isLoggedIn={isLoggedIn}
        newsCards={newsCards}
        setNewsCards={setNewsCards}
        handleDeleteArticle={handleDeleteArticle}
      />
    </>
  );
};
export default SavedNews;
