import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert";
import Dashboard from "../Layouts/Dashboard";
import Navbar from "../Layouts/Navbar";
const axios = require("axios");
const Login = (props) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState("");
  const [signinFlag, setSigninFlag] = useState(false);
  const onChangeCapture = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    localStorage.getItem("status");
    localStorage.setItem("status", 0);
  });
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const newUer = { email, password };
      const body = JSON.stringify(newUer);
      const res = await axios.post(
        "http://localhost:4000/api/users/login",
        body,
        config
      );
      if (res.data.status === "Error") {
        // (res.data.Message)
        setAlert(res.data.data[0]["msg"]);
        setTimeout(() => {
          setAlert("");
        }, 5000);
      } else {
        setSigninFlag(true);
        localStorage.setItem("status", 1);
        localStorage.setItem("uEmail", res.data.data[0]["email"]);
        localStorage.setItem("token", res.data.data[0]["token"]);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {}
  };
  const { email, password } = formData;
  // if(signinFlag){
  //   return <Redirect to="/dashboard" />
  // }else{

  return (
    <Fragment>
      <Navbar />
      <section className="container">
        {alert !== "" ? <Alert msg={alert} alertType="danger" /> : ""}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={submitForm}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={onChangeCapture}
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={onChangeCapture}
              placeholder="Password"
              required
              name="password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </Fragment>
  );
  // }
};
export default Login;
