import { MDBCard } from "mdb-react-ui-kit";
import React from "react";

import "./FaceDetection.css";

const Facedetection = ({ imageUrl, box }) => {
  // console.log(box);
  return (
    <>
      {imageUrl.length && (
        <MDBCard
          style={{ maxWidth: "600px", margin: "0 auto", padding: "1em" }}
          className="my-1"
        >
          <div className="d-flex justify-content-center">
            <div className="container">
              <img
                className=""
                src={imageUrl}
                alt={imageUrl ? "image supplied by the user" : ""}
                width="300px"
                height="auto"
                id="inputImage"
              />
              {box !== undefined && Object.values(box).length !== 0 && (
                <div
                  className="box"
                  style={{
                    position: "absolute",
                    top: box.top,
                    right: box.right,
                    bottom: box.bottom,
                    left: box.left,
                  }}
                ></div>
              )}
            </div>
          </div>
        </MDBCard>
      )}
    </>
  );
};
export default Facedetection;
