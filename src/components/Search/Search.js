import SearchForm from "../SearchForm/SearchForm";
import "./Search.css";
const Search = ({ handleSearchSubmit, updateKeyword }) => {
  return (
    <section className="search">
      <div className="search__container">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__info">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>

      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        updateKeyword={updateKeyword}
      />
    </section>
  );
};

export default Search;
