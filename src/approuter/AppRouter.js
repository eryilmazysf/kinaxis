import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PrivateRouter from "./PrivateRouter";
import NewBlog from "../pages/NewBlog.js";
import Details from "../pages/Details.js";
import UpdateBlog from "../pages/UpdateBlog";

function AppRouter() {
  const [isAuth, setIsAuth] = useState(true);

  const AuthContainer = () => (
    <div>
      <PrivateRouter path="/profile" component={Profile} />
      <PrivateRouter path="/new-blog" component={NewBlog} />
      <PrivateRouter path="/update-blog/:id" component={UpdateBlog} />
      <PrivateRouter path="/detail/:id" exact component={Details} />
    </div>
  );

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route
          path="/login"
          exact
          component={() => <Login setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
        <Route path="/" exact component={Dashboard} />
        <Route path="/register" exact component={Register} />
        <Route component={AuthContainer} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
