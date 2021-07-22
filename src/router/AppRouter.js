import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import UpdateBlog from "../pages/UpdateBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Footer from "../components/Footer";
import { ProtectedRoute } from "./PrivateRouter";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />{" "}
        <Route path="/register" component={Register} />
        <Route path="/details/:id" component={Details} />{" "}
        <ProtectedRoute
          component={() => (
            <>
              <Route path="/profile" component={Profile} />
              <Route path="/edit/:id" component={UpdateBlog} />
              <Route path="/upload" component={NewBlog} />{" "}
            </>
          )}
        ></ProtectedRoute>
        <Route path="*" component={Dashboard} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default AppRouter;
