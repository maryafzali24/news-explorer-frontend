import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useForm } from "react-hook-form";

const SignInPopup = ({
  hanldeClosePopup,
  handleOutClick,
  handleLogin,
  handleSignupClick,
  isLoading,
  errorMessage,
  setErrorMessage,
}) => {
  const buttonTexts = {
    button: isLoading ? "saving..." : "sign in",
    other: "Sign up",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    handleLogin(email, password);
  };

  return (
    <PopupWithForm
      title="Sign in"
      buttonText={buttonTexts}
      onClose={hanldeClosePopup}
      onOutClick={handleOutClick}
      handleSubmit={handleSubmit(onSubmit)}
      otherButtonClick={handleSignupClick}
      isValid={isValid}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    >
      <label className="popup__label">
        Email
        <input
          className="popup__input"
          placeholder="Enter email"
          type="text"
          {...register("email", {
            required: "This field is required",
            maxLength: {
              value: 30,
              message: "Maximum length is 30 characters",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />
      </label>
      {errors.email && (
        <span className="popup__errors">{errors.email.message}</span>
      )}
      <label className="popup__label">
        Password
        <input
          className="popup__input"
          placeholder="Enter password"
          type="password"
          {...register("password", {
            required: "This feild is required",
            minLength: {
              value: 8,
              message: "Minimum length is  8 character",
            },
          })}
        />
      </label>
      {errors.password && (
        <span className="popup__errors">{errors.password.message}</span>
      )}
    </PopupWithForm>
  );
};

export default SignInPopup;
