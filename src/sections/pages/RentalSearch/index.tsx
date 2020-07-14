import React from "react";
import { RouteComponentProps } from "react-router-dom";
import RentalList from "../Home/components/RentalList";

const RentalSearch: React.FC<RouteComponentProps<{ location: string }>> = ({
  match,
}) => {
  const location = match.params.location;

  return (
    <div className="card-list">
      <div className="container">
        <h1
          className="page-title"
          style={{
            textTransform: "capitalize",
          }}
        >
          Your Home In {location}
        </h1>
        <RentalList location={location} />
      </div>
    </div>
  );
};

export default RentalSearch;
