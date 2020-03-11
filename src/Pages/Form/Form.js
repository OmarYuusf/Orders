import React from "react";
import {connect} from "react-redux"
import "./Form.css";
import * as Actions from "../../Store/Actions"

class Form extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.props.login(this.state.username, this.state.password);
    }
  };
  render() {
    return (
      <div className="form">
        <div>
          <div>
            <h5> تسجيل الدخول :</h5>
          </div>
          <input
            type="email"
            placeholder="البريد الألكتروني"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
            onKeyDown={(e) => this._handleKeyDown(e)}
          />
          <input
            type="password"
            placeholder="الرقم السري"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
            onKeyDown={(e) => this._handleKeyDown(e)}
          />
          <button
            onClick={() =>
              this.props.login(this.state.username, this.state.password)
            }
          >
            دخول
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    login: (user,pass) => dispatch(Actions.login(user,pass))
  }
}

export default connect(null,mapDispatchToProps)(Form);
