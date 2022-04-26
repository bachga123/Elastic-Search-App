import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";
import axios from "../../../helper/axios";
import { authConstants } from "../../../action/constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../action/auth";

function SignIn(props) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const auth = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    if(email===''|| password===""){
      e.preventDefault()
    }else{
      e.preventDefault()
      dispatch(login(email,password,props.history));
    }
  }
  useEffect(()=>{
    if(auth.authenticate){
      navigate('/')
    }
  },[dispatch,auth.authenticate])

  return (
    <>
      <div className="form-auth">
        <h1 className="form-title">Sign in</h1>
        <Form className="my-4">
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Email"
              name="email"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              className="text-input"
              placeholder="Password"
              name="password"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="btsubmit " variant="info" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <p className="p-signup">
          Don't have an account?
          <Link to="/sign-up">
            <Button variant="success" size="sm" className="ml-2">
              Sign-up
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
