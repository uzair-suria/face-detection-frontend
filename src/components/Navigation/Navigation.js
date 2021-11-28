import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

import brain from "./../../brain.png";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light" sticky>
      <MDBContainer fluid={true}>
        <MDBNavbarBrand href="#">
          <img src={brain} height="30" alt="" loading="lazy" />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="d-flex mw-100 justify-content-end">
            {isSignedIn ? (
              <MDBNavbarItem>
                <MDBNavbarLink
                  className="navBtn"
                  onClick={() => onRouteChange("signout")}
                >
                  Sign Out
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="navBtn"
                    onClick={() => onRouteChange("register")}
                  >
                    Register
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="navBtn"
                    onClick={() => onRouteChange("signin")}
                  >
                    Sign In
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navigation;
