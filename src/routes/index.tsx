import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import {
  ProtectedRoute,
  PublicRoute,
  useAuth,
} from "../providers/AuthProvider/index";
import Header from "../sections/layouts/Header";
import { routes } from "./routes";

export type IRouteTypes = "PUBLIC" | "PRIVATE" | "COMMON";
export interface IRoute {
  path: string;
  types: IRouteTypes;
  component: React.FC<RouteComponentProps<any>>;
}

const Routes = () => {
  const auth: any = useAuth();

  useEffect(() => {
    if (auth) auth.checkAuthState();
  }, [auth]);

  const allRoutes = [...routes];

  return (
    <Switch>
      {allRoutes.map(({ path, component: Component, types }, index) =>
        types === "PUBLIC" ? (
          <PublicRoute key={index} exact path={path} component={Component} />
        ) : types === "PRIVATE" ? (
          <ProtectedRoute key={index} exact path={path} component={Component} />
        ) : (
          <Route
            key={index}
            exact
            path={path}
            render={(props) => (
              <React.Fragment>
                <Header />
                <Component {...props} />
              </React.Fragment>
            )}
          />
        )
      )}
    </Switch>
  );
};

export default Routes;
