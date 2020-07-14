import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Rental } from "../../../../../api/rentals";
import { AppActionsType } from "../../../../../store/actions/index";
import { deleteRentalAction } from "../../../../../store/actions/rentalActions";
import { AppStateType } from "../../../../../store/index";
import { IRental } from "../RentalList/index";
import "./styles.scss";

interface Props {
  rental: IRental;
}

const RentalCard: React.FC<Props & IMapStateToProps & IMapDispatchToProps> = ({
  rental,
  userId,
  deleteRentalAction,
}) => {
  const isOwner = userId === rental.owner;

  const handleRentalDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure, you want to delete this rental?"
    );
    if (shouldDelete) {
      Rental.deleteRental(rental._id)
        .then(() => deleteRentalAction(rental._id))
        .catch((errors) =>
          toast.error(
            errors[0].message || "Something went wrong, please try again later!"
          )
        );
    }
  };

  return (
    <div className="col-md-3">
      <Link className="rental-link" to={`/rentals/${rental._id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={rental.image.url} alt="Card cap" />
          <div className="card-body">
            <h6 className="card-subtitle mb-0 text-muted">
              {rental.shared ? "Shared" : "Whole"} {rental.category} &#183;{" "}
              {rental.city}
            </h6>
            <h5 className="card-title big-font">
              {rental.title.substr(0, 16)} [...]
            </h5>
            <p className="card-text">
              <strong>${rental.dailyPrice}</strong> per Night &#183; Free
              Cancelation
            </p>
          </div>
        </div>
      </Link>
      {isOwner && (
        <>
          <button className="btn btn-danger" onClick={handleRentalDelete}>
            Delete
          </button>
          <Link to={`/rentals/${rental._id}/edit`}>
            <button className="btn btn-primary ml-2">Update</button>
          </Link>
        </>
      )}
    </div>
  );
};

interface IMapStateToProps {
  userId: string | null;
}

interface IMapDispatchToProps {
  deleteRentalAction: (rentalId: string) => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  deleteRentalAction: bindActionCreators(deleteRentalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentalCard);
