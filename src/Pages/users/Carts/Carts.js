import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../../Store/Actions";
import "./Carts.css";

class Carts extends Component {
  render() {
    return (
      <div className="carts">
        <div className="products-added">
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>السعر</th>
                <th>الوزن</th>
                <th>السعر الكلي</th>
                <th>التعديل</th>
              </tr>
            </thead>
            <tbody>
              {this.props.carts.map(newData => {
                return (
                  <tr key={Math.random()}>
                    <td>{newData.item}</td>
                    <td>{newData.price}</td>
                    <td>{newData.count}</td>
                    <td>{newData.price * newData.count}</td>
                    <td>
                      <button onClick={() => this.props.deleteItem(newData)}>
                        مسح
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="send-order" onClick={() => this.props.sendOrder(this.props.carts,this.props.data.username)}>
            إرسال
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    carts: state.carts,
    data:state.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: newData => dispatch(Actions.deleteItem(newData)),
    sendOrder: (carts,userName) => dispatch(Actions.sendOrder(carts,userName))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Carts);
