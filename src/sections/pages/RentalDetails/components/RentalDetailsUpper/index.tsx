import React from "react";
import RentalMap from "../RentalMap";

interface Props {
  rentalImage: string;
  location: string;
}

const RentalDetailsUpper: React.FC<Props> = ({ rentalImage, location }) => {
  return (
    <div className="upper-section">
      <div className="row">
        <div className="col-md-6">
          <img src={rentalImage} alt="" />
        </div>
        <div className="col-md-6">
          <RentalMap location={location} />
        </div>
      </div>
    </div>
  );
};

export default RentalDetailsUpper;
