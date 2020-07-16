import React from "react";
import { connect } from "react-redux";

import FormInput from "./../form-input/form-input.component";
import CustomButton from "./../custom-button/custom-button.component";

import { signUpStart } from "./../../redux/user/user.actions";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    signUpStart({ displayName, email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2>I don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            onChange={this.handleChange}
            value={displayName}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            onChange={this.handleChange}
            value={email}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            onChange={this.handleChange}
            value={password}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
            value={confirmPassword}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
