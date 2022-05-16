import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CDBNavbar, CDBInput } from "cdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { signout } from "../../action/auth";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarFlatfrom = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(signout());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand style={{ marginLeft: "30px", fontSize: "35px" }}>
        Platform
      </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <div style={{ margin: "0 30px", fontSize: "25px" }}>
              <Link to="/" className="reset-link">
                API
              </Link>
            </div>
            <div style={{ margin: "0", fontSize: "25px" }}>
              <Link to="/indexs" className="reset-link">
                Indexs
              </Link>
            </div>
          </Nav>
          <Nav>
            <NavDropdown
              title={auth.user.fullName || "Tài khoản"}
              id="collasible-nav-dropdown"
            >
              {token ? (
                <NavDropdown.Item>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item>
                    <Link className="dropdown-item" to="/sign-in">
                      Đăng nhập
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className="dropdown-item" to="/sign-up">
                      Đăng ký
                    </Link>
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarFlatfrom;
