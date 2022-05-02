import React from "react";
import PropTypes from "prop-types";

import "../SignIn/style.css";
import {signup} from '../../../action/auth'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link ,useNavigate} from "react-router-dom";
import { useState, useContext } from "react";
import {useDispatch,useSelector} from 'react-redux'
// import { AuthContext } from "../../contexts/AuthContext";
// import AlertMessage from "../layout/AlertMessage";

SignUp.propTypes = {};

function SignUp(props) {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [fullName,setFullName]=useState('')
  const onChangeLoginForm = () => {};
  const auth = useSelector((state) => state.auth);
  const handleSignUp = async (e) => {
    if(email===''||password===''||fullName===''){
      e.preventDefault()
    }else{
      e.preventDefault()
      dispatch(signup(email,password,fullName))
    }
  };
  if(auth.authenticate){
    navigate('/')
  }

  return (
    <>
      <div className="form-auth">
        <h1 className="form-title">Sign up</h1>

        <Form className="my-4">
          <Form.Group>
            <Form.Control
              type="text"
              className="text-input"
              placeholder="Fullname"
              name="fullname"
              required
              onChange={(e)=>setFullName(e.target.value)}
            />
          </Form.Group>
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

          <Button className="btsubmit " variant="info" type="submit" onClick={handleSignUp}>
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
