import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionsType } from "../../../store/actions/index";
import { setRentalAction } from "../../../store/actions/rentalActions";
import { AppStateType } from "../../../store/index";
import { IRental } from "../Home/components/RentalList/index";
import RentalAssets from "./components/RentalAssets";
import RentalBooking from "./components/RentalBooking";
import RentalDetailsUpper from "./components/RentalDetailsUpper";
import "./styles.scss";

type Props = RouteComponentProps<{ rentalId: string }> &
  IMapStateToProps &
  IMapDispatchToProps;

const RentalDetails: React.FC<Props> = ({
  match,
  rental,
  setRentalAction,
  userId,
}) => {
  const setRentalActionRef = useRef(setRentalAction);

  const rentalId = match.params.rentalId;

  useEffect(() => {
    setRentalActionRef.current(rentalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => setRentalActionRef.current(null);
  }, [rentalId]);

  const getLocation = () => {
    return rental?.city && rental.street && rental.city + ", " + rental.street;
  };

  if (!rental) return null;
  return (
    <div className="container">
      <section id="rentalDetails">
        <RentalDetailsUpper
          rentalImage={rental?.image.url || ""}
          location={getLocation() || ""}
        />

        <div className="details-section">
          <div className="row">
            <RentalAssets rental={rental} />
            {rental && userId && rental.owner !== userId && (
              <RentalBooking rental={rental} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface IMapStateToProps {
  rental: IRental | null;
  userId: string | null;
}

interface IMapDispatchToProps {
  setRentalAction: (rentalId: string | null) => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  rental: state.rentals.item,
  userId: state.auth.userId,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setRentalAction: bindActionCreators(setRentalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentalDetails);
