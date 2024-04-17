import notFoundImage from "../../images/not-found.svg";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <img className="not-found__image" src={notFoundImage} alt="not-found" />
      <h3 className="not-found__title">Nothing Found</h3>
      <p className="not-found__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
};

export default PageNotFound;
