import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../Alert";
import Dashboard from "../Layouts/Dashboard";
import Navbar from "../Layouts/Navbar";
const axios = require("axios");

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [alert, setAlert] = useState("");
  const [signupFlag, setSignupFlag] = useState(false);
  const { name, email, password, confirmpassword } = formData;
  const onChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setAlert("Password not match");
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const newUer = { name, email, password, confirmpassword };
        const body = JSON.stringify(newUer);
        const res = await axios.post(
          "http://localhost:4000/api/users/signup",
          body,
          config
        );
        if (res.data.status === "Error") {
          setAlert(res.data.data[0]["msg"]);
          setTimeout(() => {
            setAlert("");
          }, 5000);
        } else {
          setSignupFlag(true);
        }
      } catch (error) {}
    }
  };
  return (
    <Fragment>
      <Navbar />
      <section className="container">
        {signupFlag ? (
          <Dashboard />
        ) : (
          <section>
            {alert !== "" ? <Alert msg={alert} alertType="danger" /> : ""}
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={submitForm}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChangeCapture={onChangeText}
                  name="name"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  onChangeCapture={onChangeText}
                  value={email}
                  name="email"
                />
              </div>
              <div className="form-group">
                <input
                  onChangeCapture={onChangeText}
                  value={password}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <input
                  onChangeCapture={onChangeText}
                  value={confirmpassword}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </form>
            <p className="my-1">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </section>
        )}
      </section>
    </Fragment>
  );
};
export default Register;
