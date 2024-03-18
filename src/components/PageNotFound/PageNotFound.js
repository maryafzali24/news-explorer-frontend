import notFoundImage from "../../images/not-found.svg";

const PageNotFound = () => {
  return (
    <section className="not-found">
      <img src={notFoundImage} className="not-found__image" alt="Sad face" />
      <h3 className="not-found__title">Nothing Found</h3>
      <p className="not-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
};

export default PageNotFound;
