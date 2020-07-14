import decode from "jwt-decode";
import moment from "moment";
import React, { createContext, useContext } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useHistory,
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Auth } from "../../api/auth";
import Header from "../../sections/layouts/Header";
import { setAuthStateAction } from "../../store/actions/authActions";
import { AppActionsType } from "../../store/actions/index";

const AuthContext: any = createContext(null);

interface IMapDispatchToProps {
  setAuthStateAction?: (isAuth: boolean, userId: string) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionsType>
): IMapDispatchToProps => ({
  setAuthStateAction: bindActionCreators(setAuthStateAction, dispatch),
});

type Props = IMapDispatchToProps;

export let AuthProvider: React.FC<Props> = ({
  children,
  setAuthStateAction,
}) => {
  const history = useHistory();

  const login = (formData: { email: string; password: string }) => {
    return Auth.login(formData).then((data: any) => {
      localStorage.setItem("tid", data.token);
      const decodedToken: any = decode(data.token);
      setAuthStateAction &&
        setAuthStateAction(!!decodedToken, decodedToken.uid);
      return data;
    });
  };

  const logOut = () => {
    localStorage.removeItem("tid");
    setAuthStateAction && setAuthStateAction(false, "");
    history.push("/login");
  };

  const checkAuthState = () => {
    try {
      const decodedToken: any = decode(localStorage.getItem("tid") || "");
      if (decodedToken && decodedToken.exp) {
        const exp = moment.unix(decodedToken.exp);
        if (exp && moment().isBefore(exp)) {
          setAuthStateAction &&
            setAuthStateAction(!!decodedToken, decodedToken.uid);
          return true;
        } else {
          setAuthStateAction && setAuthStateAction(false, "");
          return false;
        }
      }
    } catch (err) {
      setAuthStateAction && setAuthStateAction(false, "");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ login, checkAuthState, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider = connect(null, mapDispatchToProps)(AuthProvider);

export const withAuth = (Component: any) => (props: any) => {
  return (
    <AuthContext.Consumer>
      {(authApi: any) => <Component {...props} {...authApi} />}
    </AuthContext.Consumer>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute: React.FC<{
  component: React.FC<RouteComponentProps>;
  exact: boolean;
  path: string;
}> = ({ component: Component, ...rest }) => {
  const auth: any = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.checkAuthState() ? (
          <React.Fragment>
            <Header />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export const PublicRoute: React.FC<{
  component: React.FC<RouteComponentProps>;
  exact: boolean;
  path: string;
}> = ({ component: Component, ...rest }) => {
  const auth: any = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.checkAuthState() ? (
          <React.Fragment>
            <Header />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
