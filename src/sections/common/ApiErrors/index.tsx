import React from "react";

interface Props {
  errors?: any[];
}

const ApiErrors: React.FC<Props> = ({ errors }) => {
  return (
    <div>
      {errors &&
        !!errors.length &&
        errors.map((err, index) => (
          <div key={index} className="alert alert-danger">
            <p>{err.message}</p>
          </div>
        ))}
    </div>
  );
};

export default ApiErrors;
