import "./App.css";
import Home from "./Pages/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./Pages/Explore/Explore/Explore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./Pages/Shared/PrivateRoute/PrivateRoute";
import ProductDetailPage from "./Pages/ProductDetail/ProductDetailPage/ProductDetailPage";
import NotFound from "./Pages/Shared/NotFound/NotFound";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/placeorder/:id">
              <PlaceOrder />
            </PrivateRoute>
            <PrivateRoute path="/explore/:id">
              <ProductDetailPage />
            </PrivateRoute>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
