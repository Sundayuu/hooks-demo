import React from 'react';
import AsyncRoute, { Loader } from './async-router';

type TFnComponent = (...params: Array<any>) => any;

export interface IRoute {
  path: string;
  strict?: boolean;
  exact?: boolean;
  component?: React.ComponentClass<any> | TFnComponent;
  asyncComponent?: Loader;
  routes?: Array<IRoute>;
}

export default function routeWithSubRoutes(
  routes: Array<IRoute>,
  handlePathMatched: Function
) {
  return routes.map((route, index) => {
    return (
      <AsyncRoute
        key={index}
        exact={route.exact}
        strict={route.strict}
        path={route.path}
        subRoutes={route.routes}
        load={route.asyncComponent}
        handlePathMatched={handlePathMatched}
      />
    );
  });
}
