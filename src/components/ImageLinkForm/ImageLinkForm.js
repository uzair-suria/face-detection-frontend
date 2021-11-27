import React from "react";
import { MDBInput, MDBCard, MDBBtn } from "mdb-react-ui-kit";

const ImageLinkForm = () => {
  return (
    <div>
      <div>
        <MDBCard
          style={{ maxWidth: "600px", margin: "0 auto", padding: "1em" }}
        >
          <div className="d-flex justify-content-center">
            <p>Enter an image link below to detect face</p>
          </div>
          <div>
            <MDBInput label="Image URL" id="imageUrl" type="text" size="lg" />
          </div>
          <MDBBtn rounded className="my-3 mx-auto">
            Submit
          </MDBBtn>
        </MDBCard>
      </div>
    </div>
  );
};

export default ImageLinkForm;
