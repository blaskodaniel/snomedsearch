import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../routes";
import Main from "../Main/Main";

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      {routes.map((route, key) => {
        return route.visible ? (
          <Route path={route.path} component={route.component} key={key} />
        ) : null;
      })}
      <Route path="*" render={() => "404 Not found"} />
    </Switch>
  );
};

export default Routing;
