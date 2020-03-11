import React from "react";
import "./Admin.css";
import { connect } from "react-redux";
import * as Actions from "../../Store/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Admin extends React.Component {
  state = {
    item: "",
    price: ""
  };

  componentDidMount() {
    this.props.getOrders();
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.addProduct(this.state);
    }
  };
  render() {
    return (
      <div className="admin">
        <div className="navbar-admin">
          <div className="logout-admin" onClick={() => this.props.logout()}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div>
            <h5>ADMIN</h5>
          </div>
        </div>
        <div className="cat-edit">
          {this.props.allProducts.map(items => {
            return (
              <div className="cats" key={Math.random()}>
                <p className="name">{items.item}</p>
                <p className="price">{items.price}</p>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => this.props.deleteProduct(items.id)}
                />
              </div>
            );
          })}
        </div>
        <div className="cat-add">
          <h4>إضافة منتج</h4>
          <div>
            <input
              type="text"
              placeholder="اسم المنتج"
              name="item"
              value={this.state.item}
              onChange={e => this.handleChange(e)}
              onKeyDown={e => this._handleKeyDown(e)}
            />
            <input
              type="number"
              placeholder="سعر المنتج"
              name="price"
              value={this.state.price}
              onChange={e => this.handleChange(e)}
              onKeyDown={e => this._handleKeyDown(e)}
            />
            <button onClick={() => this.props.addProduct(this.state)}>
              اضافة
            </button>
          </div>
        </div>

        <div className="orders">
          {this.props.orders.length === 0 ? <h2>loading</h2> : null}
          {this.props.orders.map(orders => {
            return (
              <div className="order" key={Math.random()}>
                <div className="order-header">
                  <h3>{orders.title}</h3>
                  <p>{orders.time}</p>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>الصنف</th>
                      <th>الوزن</th>
                      <th>السعر</th>
                      <th>السعر الكلي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.choices.map(items => {
                      return (
                        <tr key={Math.random()}>
                          <td>{items.item}</td>
                          <td>{items.count}</td>
                          <td>{items.price}</td>
                          <td>{items.price * items.count}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="buttons">
                  <button onClick={() => this.props.deleteOrder(orders.id)}>
                    مسح
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(Actions.getOrders()),
    logout: () => dispatch(Actions.logout()),
    deleteOrder: id => dispatch(Actions.deleteOrder(id)),
    addProduct: state => dispatch(Actions.addProduct(state)),
    deleteProduct: id => dispatch(Actions.deleteProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
