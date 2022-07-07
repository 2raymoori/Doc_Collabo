const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../Model/User.model");

const userLogin = async (req, res) => {
  console.log(req.body);
  try {
    const inputValidate = validationResult(req);
    if (inputValidate.errors.length > 0) {
      return res
        .status(201)
        .json({ status: "Error", data: inputValidate.errors });
    } else {
      const { password, email } = req.body;

      const userFind = await UserModel.find({ email: email });
      // check if user exists
      if (userFind.length > 0) {
        // Check is passwor matches
        const currentUser = userFind[0];
        const passwordVerifyCheck = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (passwordVerifyCheck) {
          // every thing okay. return token
          const payload = {
            email: currentUser.email,
            id: currentUser.id,
          };
          jwt.sign(payload, config.get("TOKEN_KEY"), (err, token) => {
            if (err) throw err;
            return res.status(200).json({
              status: "Success",
              data: [{ token: token, email: email }],
            });
          });
        } else {
          // password not match
          return res.status(201).json({
            status: "Error",
            data: [{ msg: `Sorry No Such user with these credentials` }],
          });
        }
      } else {
        return res.status(201).json({
          status: "Error",
          data: [{ msg: `Sorry No Such user with these credentials` }],
        });
      }
      // return res.status(200).json({"status":"success","data":[{"msg":userFind}]})
    }
  } catch (error) {}
};

const userSignUp = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, confirmpassword } = req.body;
    const validationRes = validationResult(req);
    if (validationRes.errors.length > 0) {
      return res
        .status(201)
        .json({ status: "Error", data: validationRes.errors });
    } else if (password.trim() !== confirmpassword.trim()) {
      return res.status(201).json({
        status: "Error",
        data: [
          {
            msg: "Sorry Both password and Confirm password must be the same.",
          },
        ],
      });
    } else {
      // Check if user already exists
      const userExists = await UserModel.find({ email: email });
      if (userExists.length > 0) {
        return res.status(201).json({
          status: "Error",
          data: [{ msg: "Sorry user already exists" }],
        });
      }
      const newUser = new UserModel();
      newUser.name = name;
      newUser.email = email;
      // ENCRYPT PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      newUser.password = hashPass;

      /// GENERATE TOKEN
      const payload = {
        email: email,
        id: newUser.id,
      };
      jwt.sign(
        payload,
        config.get("TOKEN_KEY"),
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) {
            return res
              .status(201)
              .json({ status: "Error", data: [{ msg: "sdfsdf" }] });
          } else {
            await newUser.save();
            return res.status(200).json({
              status: "Success",
              data: [{ msg: newUser, token: token }],
            });
          }
        }
      );
    }
  } catch (error) {
    error;
    return res.status(500).json({ status: "Failure", data: "Error..." });
  }
};

module.exports = {
  userLogin,
  userSignUp,
};
