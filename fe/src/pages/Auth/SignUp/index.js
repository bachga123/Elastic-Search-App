import React from "react";
import PropTypes from "prop-types";

import "../SignIn/style.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import AlertMessage from "../layout/AlertMessage";

SignUp.propTypes = {};

function SignUp(props) {
  const onChangeLoginForm = () => {};

  const handleSubmit = () => {};

  return (
    <>
      <div className="form-auth">
        <h1 className="form-title">Sign up</h1>

        <Form className="my-4" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Fullname"
              name="fullname"
              required
              onChange={onChangeLoginForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Email"
              name="email"
              required
              onChange={onChangeLoginForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              className="text-input"
              placeholder="Password"
              name="password"
              required
              onChange={onChangeLoginForm}
            />
          </Form.Group>

          <Button className="btsubmit " variant="info" type="submit">
            Signup
          </Button>
        </Form>
        <p className="p-signup">
          Already have an account?
          <Link to="/sign-in">
            <Button variant="success" size="sm" className="ml-2">
              Sign-in
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
