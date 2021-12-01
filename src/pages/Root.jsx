import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import Admin from "./admin/Admin";
import Escala from "./escala/Escala";

const PagesRoot = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/escala" component={Escala} />
      {/*<Route exact path='/cadastro/facilities/:myFacility'  />   a criar  */}
    </Switch>
  </Router>
);

export default PagesRoot;
