import React from "react";
import NewsCardListSaved from "../NewsCardList/NewsCardsListSaved";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

const SavedNews = ({
  onSignInClick,
  isLoggedIn,
  onLogOut,
  // newsCards,
  // setNewsCards,
  // handleDeleteClick,
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
        // newsCards={newsCards}
        // setNewsCards={setNewsCards}
        // handleDeleteClick={handleDeleteClick}
      />
    </>
  );
};
export default SavedNews;
