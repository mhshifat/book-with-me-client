import React from "react";
import { RouteComponentProps } from "react-router-dom";
import RentalList from "./components/RentalList";
import "./styles.scss";

const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div className="card-list">
      <div className="container">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList />
      </div>
    </div>
  );
};

export default Home;
