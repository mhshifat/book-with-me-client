import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { withAuth } from "../../../../../providers/AuthProvider/index";
import ApiErrors from "../../../../common/ApiErrors";

const LoginForm: React.FC<any> = (props) => {
  const { register, handleSubmit, errors, clearErrors } = useForm<{
    email: string;
    password: string;
  }>();
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<any[] | null>(null);
  const history = useHistory();

  // eslint-disable-next-line no-useless-escape
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLoginFormSubmit = (formData: {
    email: string;
    password: string;
  }) => {
    props
      .login(formData)
      .then((data: any) => {
        setShowSuccessMessage(true);
        clearErrors();
        setTimeout(() => {
          history.push("/");
        }, 1500);
      })
      .catch((errors: any) => setApiErrors(errors));
  };

  return (
    <React.Fragment>
      {showSuccessMessage && (
        <div className="alert alert-success">
          You have been successfully logged in!
        </div>
      )}
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
        <button type="submit" className="btn btn-bwm-main">
          Submit
        </button>
      </form>
      <ApiErrors errors={apiErrors || []} />
    </React.Fragment>
  );
};

export default withAuth(LoginForm);
