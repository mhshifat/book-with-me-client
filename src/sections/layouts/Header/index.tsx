import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider/index";
import { AppStateType } from "../../../store/index";
import "./styles.scss";

type Props = IMapStateToProps;

const Header: React.FC<Props> = ({ auth }) => {
  const [location, setLocation] = useState<string | null>(null);
  const authApi: any = useAuth();
  const history = useHistory();

  const handleSearch = () => {
    if (location) history.push(`/rentals/${location}/homes`);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to="/" className="navbar-brand">
        <h1 className="logo">BookWithMe</h1>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={location || ""}
            onChange={(e) => setLocation(e.target.value)}
          />
        </form>

        <ul className="navbar-nav ml-auto">
          {auth && auth.isAuth && (
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Welcome {auth.username}{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          )}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Manage
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/rentals/new" className="dropdown-item">
                New Rental
              </Link>
              <Link to="/rentals/manage" className="dropdown-item">
                Manage Rentals
              </Link>
              <Link to="/bookings/manage" className="dropdown-item">
                Manage Bookings
              </Link>
              <Link to="/bookings/received" className="dropdown-item">
                Bookings Received
              </Link>
            </div>
          </li>
          {auth && auth.isAuth && (
            <li className="nav-item">
              <Link
                to="/login"
                onClick={(e) => {
                  e.preventDefault();
                  authApi.logOut();
                }}
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          )}
          {auth && !auth.isAuth && (
            <React.Fragment>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

interface IMapStateToProps {
  auth: { isAuth: boolean; username: string };
}

const mapStateToProps = (state: AppStateType): IMapStateToProps => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);
