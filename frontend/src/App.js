import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";

import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Loader from "./components/shared/Loader/Loader";

import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Room from "./pages/Room/Room";

function App(location) {
  const { loading } = useLoadingWithRefresh();
  const GuestRoute = ({ children, ...rest }) => {
    const { isAuth } = useSelector((state) => state.authSlice);

    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth ? (
            <Redirect to={{ pathname: "/rooms", state: { from: location } }} />
          ) : (
            children
          );
        }}
      />
    );
  };

  const SemiProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.authSlice);

    return (
      <Route
        {...rest}
        render={({ location }) => {
          return !isAuth ? (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          ) : isAuth && !user.activated ? (
            children
          ) : (
            <Redirect to={{ pathname: "/rooms", state: { from: location } }} />
          );
        }}
      />
    );
  };

  const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.authSlice);
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return !isAuth ? (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          ) : isAuth && !user.activated ? (
            <Redirect to={{ pathname: "/activate" }} />
          ) : (
            children //[Rooms Page]
          );
        }}
      />
    );
  };

  return loading ? (
    <Loader message="Loading, Please wait..." />
  ) : (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>

        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
        <ProtectedRoute path="/room/:id">
          <Room />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/*
[How this works] 

If(!user.isAuthenticated && !user.isActivated) {
  <Redirect to="LoginPage" />
}else if(user.isAuthenticated && !user.isActivated){
  <Redirect to="ActivatePage" />
}else if(user.isAuthenticated && user.isActivated){
  <Redirect to="RoomsPage" /> 
}
*/
