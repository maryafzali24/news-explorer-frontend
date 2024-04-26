import React from "react";
import NewsCard from "../NewsCard/NewsCard";
// import { getItems } from "../../utils/api";
import "./NewsCardList.css";
const NewsCardListSaved = ({
  isLoggedIn,
  newsCards,
  setNewsCards,
  handleDeleteArticle,
}) => {
  // const [newsCards, setNewsCards] = useState([]);

  // useEffect(() => {
  //   // Fetch articles when the component mounts
  //   getItems()
  //     .then((items) => {
  //       // Set the fetched articles in the state
  //       setNewsCards(items);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error("Error fetching articles:", error);
  //     });
  // }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <section className="news">
      <ul className="news__cards">
        {newsCards.map((card) => (
          <NewsCard
            card={card}
            key={Math.random()}
            isLoggedIn={isLoggedIn}
            isBooked={true}
            handleDeleteArticle={handleDeleteArticle}
            newsCards={newsCards}
            setNewsCards={setNewsCards}
          />
        ))}
      </ul>
    </section>
  );
};

export default NewsCardListSaved;
