import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionsType } from "../../../store/actions/index";
import { setManageBookingsReceivedAction } from "../../../store/actions/manageActions";
import { AppStateType } from "../../../store/index";
import BookingListing from "../../common/BookingListing";

type Props = IMapStateToProps & IMapDispatchToProps;

const BookingsReceived: React.FC<Props> = ({
  bookings,
  setManageBookingsReceivedAction,
}) => {
  const setManageBookingsReceivedActionRef = useRef(
    setManageBookingsReceivedAction
  );

  useEffect(() => {
    setManageBookingsReceivedActionRef.current();
  }, []);

  return (
    <div className="card-list">
      <div className="container">
        <BookingListing title="Received Bookings" bookings={bookings} />
      </div>
    </div>
  );
};

interface IMapStateToProps {
  bookings: any[];
}

interface IMapDispatchToProps {
  setManageBookingsReceivedAction: () => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  bookings: state.manage.receivedBookings,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setManageBookingsReceivedAction: bindActionCreators(
    setManageBookingsReceivedAction,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingsReceived);
