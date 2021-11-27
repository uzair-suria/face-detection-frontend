import React from "react";
import { MDBInput, MDBCard, MDBBtn } from "mdb-react-ui-kit";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <MDBCard
        style={{ maxWidth: "600px", margin: "0 auto", padding: "1em" }}
        className="my-1"
      >
        <div className="d-flex justify-content-center">
          <p>Enter an image link below to detect face</p>
        </div>
        <div>
          <MDBInput
            label="Image URL"
            id="imageUrl"
            type="text"
            size="lg"
            onChange={onInputChange}
          />
        </div>
        <MDBBtn rounded className="my-3 mx-auto" onClick={onSubmit}>
          Submit
        </MDBBtn>
      </MDBCard>
    </div>
  );
};

export default ImageLinkForm;
