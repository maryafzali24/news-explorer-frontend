import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./SearchForm.css";

const SearchForm = ({ handleSearchSubmit, updateKeyword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchBtnColor, setSearchBtnColor] = useState({});

  const onSubmit = (data) => {
    updateKeyword(data.searchs);
    handleSearchSubmit(data.searchs);
    setSearchBtnColor("#2a65cc");
  };
  useEffect(() => {
    setSearchBtnColor({
      backgroundColor: "#2f71e5",
    });
  }, []);
  return (
    <form className="search__form" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="search__fieldset">
        <div className="search__container">
          <input
            className="search__input"
            type="text"
            placeholder="Enter topic"
            {...register("searchs", {
              required: "Please enter a keyword",
            })}
          />
          {errors.searchs && (
            <span className="search__errors">{errors.searchs.message}</span>
          )}
        </div>
        <button
          className="search__search"
          style={{ backgroundColor: searchBtnColor }}
        >
          Search
        </button>
      </fieldset>
      <button className="search__search-mobile">Search</button>
    </form>
  );
};
export default SearchForm;
