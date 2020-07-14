import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActionsType } from "../../../../../store/actions/index";
import { setRentalsAction } from "../../../../../store/actions/rentalActions";
import { AppStateType } from "../../../../../store/index";
import RentalCard from "../RentalCard";
import "./styles.scss";

export interface IRental {
  _id: string;
  title: string;
  city: string;
  street: string;
  category: string;
  owner: string;
  image: {
    url: string;
  };
  numOfRooms: number;
  shared: boolean;
  description: string;
  dailyPrice: number;
}

type Props = { location?: string } & IMapStateToProps & IMapDispatchToProps;

const RentalList: React.FC<Props> = ({
  rentals,
  setRentalsAction,
  location,
}) => {
  const setRentalsActionRef = useRef(setRentalsAction);

  useEffect(() => {
    setRentalsActionRef.current(location);
  }, [location]);

  const renderRentals = rentals.map((item) => (
    <RentalCard key={item._id} rental={item} />
  ));

  return (
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
  );
};

interface IMapStateToProps {
  rentals: IRental[];
}

interface IMapDispatchToProps {
  setRentalsAction: (location?: string) => void;
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  rentals: state.rentals.data,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setRentalsAction: bindActionCreators(setRentalsAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentalList);
