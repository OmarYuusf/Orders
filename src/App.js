import React from "react";
import "./App.css";
import Users from "./Pages/users/users";
import Form from "./Pages/Form/Form";
import Admin from "./Pages/Admin/Admin";
import Navbar from "./Pages/users/Navbar/Navbar";
import { connect } from "react-redux";
import * as Actions from "./Store/Actions";
import { Switch, Route } from "react-router-dom";
import adminOrders from "./Pages/Admin/adminOrders/adminOrders";

class App extends React.Component {
  async componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.checkUser(await localStorage.getItem("token"));
      this.props.getUserData(this.props.token);
      this.props.getProducts();
    }
  }
  render() {
    return (
      <Switch>
        <div className="App">
          {/* {localStorage.getItem("token") && this.props.admin == false ? <Users /> : <Form />} */}

          {this.props.logged == false ? null : <Navbar />}
          <Route exact path="/" component={Form} />
          {this.props.admin == true ? null : (
            <Route exact path="/home" component={Users} />
          )}
          {this.props.admin == true ? <Admin /> : null}
          {this.props.admin == true ? (
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
    checkUser: (token) => dispatch(Actions.checkUser(token)),
    getUserData: token => dispatch(Actions.getUserData(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
