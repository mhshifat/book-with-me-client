import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Rental } from "../../../api/rentals";
import { AppActionsType } from "../../../store/actions/index";
import { deleteManageBookingAction } from "../../../store/actions/manageActions";
import { AppStateType } from "../../../store/index";
import "./styles.scss";

interface Props {
  title: string;
  bookings: any[];
}

const BookingListing: React.FC<
  Props & IMapStateToProps & IMapDispatchToProps
> = ({ title, bookings, userId, deleteManageBookingAction }) => {
  const handleBookingDelete = (id: string) => {
    const shouldDelete = window.confirm(
      "Are you sure, you want to delete this booking?"
    );
    if (shouldDelete) {
      Rental.deleteBooking(id)
        .then(() => deleteManageBookingAction(id))
        .catch((errors) =>
          toast.error(
            errors[0].message || "Something went wrong, please try again later!"
          )
        );
    }
  };

  return (
    <section className="booking-listing">
      <h1 className="page-title">{title}</h1>
      <div className="row">
        {/* Iterate Bookings */}
        {bookings && !!bookings.length ? (
          bookings.map(
            (item) =>
              item && (
                <div className="col-md-4" key={item._id}>
                  <div className="card text-center">
                    {/* Only if 'received' booking */}
                    <div className="card-header">
                      From: {item.user.username}
                    </div>
                    {/* Only if 'received' booking END */}
                    <div className="card-block">
                      <h4 className="card-title">
                        Rental Title - {item.rental.title}{" "}
                      </h4>
                      <p className="card-text booking-days">
                        {moment(item.startAt).format("YYYY/MM/DD")} -{" "}
                        {moment(item.endAt).format("YYYY/MM/DD")} |{" "}
                        {item.nights} nights
                      </p>
                      <p className="card-text">
                        <span>Price: </span>{" "}
                        <span className="booking-price-value">
                          ${item.price}
                        </span>
                      </p>
                      <Link
                        to={`/rentals/${item.rental._id}`}
                        className="btn btn-primary"
                      >
                        Go to Rental
                      </Link>
                      {String(userId) === String(item.user._id) && (
                        <button
                          className="ml-1 btn btn-danger"
                          onClick={() => handleBookingDelete(item._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="card-footer text-muted">
                      Created at {moment(item.createdAt).format("YYYY/MM/DD")}
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <p
            style={{
              marginLeft: 20,
            }}
          >
            No Bookings found!
          </p>
        )}
      </div>
    </section>
  );
};

interface IMapStateToProps {
  userId: string | null;
}

interface IMapDispatchToProps {
  deleteManageBookingAction: (bookingId: string) => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  deleteManageBookingAction: bindActionCreators(
    deleteManageBookingAction,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingListing);
