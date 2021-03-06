import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import FaceDetection from "./components/FaceDetection/FaceDetection";

const initialState = {
  input: "",
  imageUrl: "",
  parsedBoundingBox: {},
  route: "signin",
  isSignedIn: false,
  user: {
    name: "",
    email: "",
    id: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const rawBoundingBox =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const box = {
      top: rawBoundingBox.top_row * height,
      right: width - rawBoundingBox.right_col * width,
      bottom: height - rawBoundingBox.bottom_row * height,
      left: rawBoundingBox.left_col * width,
    };
    this.setState({ parsedBoundingBox: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const onSubmit = () => {
      this.setState({ imageUrl: this.state.input, parsedBoundingBox: {} });
      fetch("https://uas-face-detection-app.herokuapp.com/imageurl", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((res) => {
          res = res.json().then((data) => {
            if (data) {
              fetch("https://uas-face-detection-app.herokuapp.com/image", {
                method: "put",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  id: this.state.user.id,
                }),
              })
                .then((res) => res.json())
                .then((count) => {
                  // console.log(count);
                  this.setState({
                    user: { ...this.state.user, entries: count },
                  });
                });
            }
            this.calculateFaceLocation(data);
          });
        })
        .catch((error) => console.log("error", error));
    };
    return (
      <MDBContainer fluid className="px-0">
        <>
          <Navigation
            onRouteChange={this.onRouteChange}
            route={this.state.route}
            isSignedIn={this.state.isSignedIn}
          />
          {this.state.route === "home" ? (
            <>
              <Rank
                name={this.state.user.name}
                count={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={onSubmit}
              />
              <FaceDetection
                imageUrl={this.state.imageUrl}
                box={this.state.parsedBoundingBox}
              />
            </>
          ) : this.state.route === "signin" ||
            this.state.route === "signout" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </>
      </MDBContainer>
    );
  }
}

export default App;
