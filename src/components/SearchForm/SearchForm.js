import React from "react";
import { useForm } from "react-hook-form";
import "./SearchForm.css";

const SearchForm = ({ handleSearchSubmit, updateKeyword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updateKeyword(data.searchs);
    handleSearchSubmit(data.searchs);
  };

  return (
    <form className="search__form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="search__input"
        type="text"
        placeholder="Enter topic"
        {...register("searchs", {
          required: "Please enter a keyword",
        })}
      />
      {errors.searchs && (
        <p className="search__errors">{errors.searchs.message}</p>
      )}
      <button className="search__search">Search</button>
      <button className="search__search-mobile">Search</button>
    </form>
  );
};
export default SearchForm;
