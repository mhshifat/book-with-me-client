import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionsType } from "../../../store/actions/index";
import { setManageBookingsAction } from "../../../store/actions/manageActions";
import { AppStateType } from "../../../store/index";
import BookingListing from "../../common/BookingListing";

type Props = IMapStateToProps & IMapDispatchToProps;

const ManageBookings: React.FC<Props> = ({
  setManageBookingsAction,
  bookings,
}) => {
  const setManageBookingsActionRef = useRef(setManageBookingsAction);

  useEffect(() => {
    setManageBookingsActionRef.current();
  }, []);

  return (
    <div className="card-list">
      <div className="container">
        <div className="row">
          <BookingListing title="Your Bookings" bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

interface IMapStateToProps {
  bookings: any[];
}

interface IMapDispatchToProps {
  setManageBookingsAction: () => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  bookings: state.manage.bookings,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setManageBookingsAction: bindActionCreators(
    setManageBookingsAction,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookings);
