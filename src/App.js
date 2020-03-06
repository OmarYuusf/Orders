import React from "react";
import "./App.css";
import Form from "./Pages/Form/Form";
import Admin from "./Pages/Admin/Admin";
import Navbar from "./Pages/users/Navbar/Navbar";
import { connect } from "react-redux";
import * as Actions from "./Store/Actions";
import { Switch, Route } from "react-router-dom";
import adminOrders from "./Pages/Admin/adminOrders/adminOrders";
import Products from "./Pages/users/Products/Products";
import Carts from "./Pages/users/Carts/Carts";

class App extends React.Component {

  async componentDidMount() {
    if (localStorage.getItem("refreshToken")) {
      await this.props.checkUser(localStorage.getItem("refreshToken"));
      this.props.getUserData(this.props.token);
      this.props.getProducts();

      // setInterval(() => {
      //   this.props.checkToken();
      // }, 1000);
    }
    if (localStorage.getItem("cartsData")) {
      const data = JSON.parse(await localStorage.getItem("cartsData"));
      this.props.getCarts(data);
    }
  }

  backLogin = () => {
    window.location.href = "/";
  };
  render() {

    return (
      <Switch>
        <div className="App">
          {this.props.admin === true ? null : (
            <Route exact path="/" component={Form} />
          )}

          {this.props.logged === false ? null : (
            <>
              <Navbar />
              <Route exact path="/home" component={Products} />
              <Route path="/carts" component={Carts} />
            </>
          )}

          {this.props.admin === true ? <Admin /> : null}

          {this.props.admin === true ? (
            <Route exact path="/home/orders" component={adminOrders} />
          ) : null}
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    admin: state.admin,
    logged: state.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(Actions.getProducts()),
    checkUser: token => dispatch(Actions.checkUser(token)),
    getUserData: token => dispatch(Actions.getUserData(token)),
    getCarts: carts => dispatch(Actions.getCarts(carts))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
