import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionsType } from "../../../store/actions/index";
import { setManageRentalsAction } from "../../../store/actions/manageActions";
import { AppStateType } from "../../../store/index";
import RentalCard from "../Home/components/RentalCard";
import { IRental } from "../Home/components/RentalList/index";

type Props = IMapStateToProps & IMapDispatchToProps;

const ManageRentals: React.FC<Props> = ({
  rentals,
  setManageRentalsAction,
}) => {
  const setManageRentalsActionRef = useRef(setManageRentalsAction);

  useEffect(() => {
    setManageRentalsActionRef.current();
  }, []);

  const renderRentals = rentals.map((item) => (
    <RentalCard key={item._id} rental={item} />
  ));

  return (
    <div className="card-list">
      <div className="container">
        <h1 className="page-title">Your Rentals</h1>
        <div className="row">
          {rentals.length > 0 ? (
            renderRentals
          ) : (
            <p
              style={{
                marginLeft: 20,
              }}
            >
              No rentals found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface IMapStateToProps {
  rentals: IRental[];
}

interface IMapDispatchToProps {
  setManageRentalsAction: () => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  rentals: state.manage.rentals,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setManageRentalsAction: bindActionCreators(setManageRentalsAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageRentals);
