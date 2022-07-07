const express = require("express");
const { userSignUp, userLogin } = require("../Controller/User.Controller");
const Router = express.Router();
const { check } = require("express-validator/check");

// Signup Route
Router.post(
  "/signup",
  [
    check("name", "Sorry First Name is requiredsss...").not().isEmpty(),
    check(
      "email",
      "Sorry Please provide a Valid Email for user registration."
    ).isEmail(),
    check("password", "Sorry Please Provide a valid password").isLength({
      min: 6,
    }),
    check("confirmpassword", "Sorry Please Provide a valid password").isLength({
      min: 6,
    }),
  ],
  userSignUp
);

// Login Route

Router.post(
  "/login",
  [
    check("password", "Sorry a Valid password is required+++").exists(),
    check("email", "Sorry a Valid email is required+++").isEmail(),
  ],
  userLogin
);

module.exports = Router;
