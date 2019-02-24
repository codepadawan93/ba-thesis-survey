import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class InputName extends Component {
  NAME_REGEX = /^[a-zA-Z\-]+$/;
  storage = window.localStorage;
  constructor() {
    super();
    let shouldRedirectImmediately = false;
    const userName = this.storage.getItem("userName");
    if (userName) {
      shouldRedirectImmediately = true;
    }
    this.state = {
      userName: "",
      shouldRedirect: shouldRedirectImmediately
    };
  }
  render() {
    return (
      <div className="col-md-4 offset-md-4">
        <h1>Enter your name:</h1>
        <form>
          <div className="form-group">
            <label for="userName">Name</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              placeholder="Enter name"
              value={this.state.userName}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={e => this.handleClick(e)}
          >
            Submit
          </button>
        </form>
        {this.state.shouldRedirect ? <Redirect to="/fill-survey" /> : null}
      </div>
    );
  }
  handleClick = e => {
    e.preventDefault();
    if (this.validateName(this.state.userName)) {
      this.storage.setItem("userName", this.state.userName);
      this.setState({ shouldRedirect: true });
    } else {
      alert("Invalid name provided, please try again.");
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  validateName = name => this.NAME_REGEX.test(name);
}

export default InputName;
