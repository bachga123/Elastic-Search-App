import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { CDBInput, CDBContainer } from "cdbreact";
import "./style.css";

SignIn.propTypes = {};

function SignIn(props) {
  return (
    <div className="form-login">
      <h4 className="header_indexs">Sign in</h4>
      <CDBContainer>
        <CDBInput
          className="form-input"
          placeholder="Username"
          icon={<i className="fa fa-profile text-dark"></i>}
        />
        <CDBInput
          className="form-input"
          c
          placeholder="email"
          type="email"
          icon={<i className="fa fa-email text-dark"></i>}
        />
      </CDBContainer>
      <Button className="bt-submit">Sign in</Button>
    </div>
  );
}

export default SignIn;
