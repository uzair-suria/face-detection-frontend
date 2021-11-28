import React from "react";
import {
  MDBValidation,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBCard,
} from "mdb-react-ui-kit";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  /*
          ============Form handlers============
*/
  onFormChange = () => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onEmailChange = (e) => {
    this.setState({ signInEmail: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ signInPassword: e.target.value });
  };
  onSubmitSignIn = () => {
    fetch("https://uas-face-detection-app.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <MDBCard
        style={{ maxWidth: "400px", margin: "0 auto", padding: "1em" }}
        className="my-1"
      >
        <div className="d-flex justify-content-center my-3">
          <h4>Sign In</h4>
        </div>
        <MDBValidation className="px-5 row g-3" noValidate>
          <div className="my-1">
            <MDBInput
              value={this.state.signInEmail}
              type="email"
              name="signInEmail"
              onChange={this.onEmailChange}
              id="validationCustom03"
              required
              label="Email"
              validation="Please provide a valid email."
              invalid
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
          <div className="my-2">
            <MDBInput
              value={this.state.signInPassword}
              type="password"
              name="signInPassword"
              onChange={this.onPasswordChange}
              id="validationCustom03"
              required
              label="Password"
              validation="Please provide a password."
              invalid
            />
          </div>
          <div className="my-1">
            <MDBCheckbox label="Remeber me" id="invalidCheck" noValidate />
          </div>
          <div className="my-1 w-3">
            <MDBBtn style={{ width: "100%" }} onClick={this.onSubmitSignIn}>
              Sign In
            </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCard>
    );
  }
}

export default SignIn;
