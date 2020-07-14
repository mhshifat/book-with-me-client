import React from "react";
import {
  FaAsterisk,
  FaCube,
  FaDesktop,
  FaLocationArrow,
  FaThermometer,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Rental } from "../../../../../api/rentals";
import EditableInput from "../../../../common/EditableInput";
import { IRental } from "../../../Home/components/RentalList/index";
import "./styles.scss";

interface Props {
  rental: IRental | null;
}

const RentalAssets: React.FC<Props> = ({ rental }) => {
  const handleUpdate = (value: any, onSuccess: any, onError: any) => {
    rental &&
      Rental.updateRental(rental._id, value)
        .then(() => onSuccess())
        .catch((err) => {
          onError();
          toast.error(
            err[0].message || "Something went wrong, please try again later"
          );
        });
  };

  return (
    <div className="col-md-8">
      <div className="rental">
        <h2 className="rental-type">
          {rental?.shared ? "Shared" : "Whole"} {rental?.category}
        </h2>
        <EditableInput
          entity={rental}
          field="title"
          onUpdate={handleUpdate}
          className="rental-title"
        />
        <EditableInput
          entity={rental}
          field="city"
          onUpdate={handleUpdate}
          className="rental-city"
        />
        <EditableInput
          entity={rental}
          field="street"
          onUpdate={handleUpdate}
          className="rental-city"
        />
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building"></i>
            <EditableInput
              entity={rental}
              field="numOfRooms"
              onUpdate={handleUpdate}
              className=""
              inline
            />{" "}
            bedrooms
          </span>
          <span>
            <i className="fa fa-user"></i>{" "}
            <EditableInput
              entity={rental}
              field="numOfRooms"
              onUpdate={handleUpdate}
              className=""
              inline
            />{" "}
            guests
          </span>
          <span>
            <i className="fa fa-bed"></i>{" "}
            <EditableInput
              entity={rental}
              field="numOfRooms"
              onUpdate={handleUpdate}
              className=""
              inline
            />{" "}
            beds
          </span>
        </div>
        <EditableInput
          type="textarea"
          entity={rental}
          field="description"
          onUpdate={handleUpdate}
          className="rental-description"
        />
        <hr />
        <div className="rental-assets">
          <h3 className="title">Assets</h3>
          <div className="row">
            <div className="col-md-6">
              <span>
                <FaAsterisk /> Cooling
              </span>
              <span>
                <FaThermometer /> Heating
              </span>
              <span>
                <FaLocationArrow /> Iron
              </span>
            </div>
            <div className="col-md-6">
              <span>
                <FaDesktop /> Working area
              </span>
              <span>
                <FaCube /> Washing machine
              </span>
              <span>
                <FaCube /> Dishwasher
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAssets;
