import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Auth } from "../../../../../api/auth";
import { sameAge } from "../../../../../helpers/validators/index";
import ApiErrors from "../../../../common/ApiErrors";

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const RegisterForm = () => {
  const { register, handleSubmit, errors, getValues, clearErrors } = useForm<{
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }>();
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<any[] | null>(null);
  const history = useHistory();

  const handleRegisterFormSubmit = (formData: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    Auth.register(formData)
      .then(() => {
        setShowSuccessMessage(true);
        clearErrors();
        setTimeout(() => {
          history.push("/login");
        }, 1500);
      })
      .catch((errors) => setApiErrors(errors));
  };

  return (
    <React.Fragment>
      {showSuccessMessage && (
        <div className="alert alert-success">
          You have been successfully registered!
        </div>
      )}
      <form onSubmit={handleSubmit(handleRegisterFormSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            ref={register({
              required: "Username is required.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            ref={register({
              required: "Email is required.",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please add a valid email.",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            ref={register({
              required: "Password is required.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmation"
            name="passwordConfirmation"
            ref={register({
              required: "Re-type your password.",
              validate: { sameAge: sameAge(getValues().password) },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="passwordConfirmation"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>
        <button type="submit" className="btn btn-bwm-main">
          Submit
        </button>
      </form>
      <ApiErrors errors={apiErrors || []} />
    </React.Fragment>
  );
};

export default RegisterForm;
