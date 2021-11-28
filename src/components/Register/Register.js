import React from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBCard,
} from "mdb-react-ui-kit";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      agreedTerms: false,
    };
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmitRegister = () => {
    fetch("https://uas-face-detection-app.herokuapp.com/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <MDBCard
        style={{ maxWidth: "400px", margin: "0 auto", padding: "1em" }}
        className="my-1"
      >
        <div className="d-flex justify-content-center my-3">
          <h4>Register Your Account</h4>
        </div>
        <MDBValidation className="row g-3 px-5" noValidate>
          <div className="col-12">
            <MDBInput
              value={this.state.name}
              name="name"
              onChange={this.onNameChange}
              id="validationCustom01"
              required
              label="Name"
              validation="Please provide your Name"
              invalid
            />
          </div>
          <div className="col-md-12">
            <MDBInput
              value={this.state.email}
              type="email"
              name="email"
              onChange={this.onEmailChange}
              id="validationCustom03"
              required
              label="Email"
              validation="Please provide a valid email."
              invalid
            />
          </div>
          <div className="col-md-12">
            <MDBInput
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.onPasswordChange}
              id="validationCustom03"
              required
              label="Password"
              validation="Please enter a password."
              invalid
            />
          </div>
          <div className="my-4 w-3">
            <MDBBtn
              style={{ width: "100%" }}
              onClick={this.onSubmitRegister}
              type="submit"
            >
              Register
            </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCard>
    );
  }
}

export default Register;
