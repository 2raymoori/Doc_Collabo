import axios from "axios";
import React, { Component, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layouts/Navbar";

const Form = () => {
  let navigate = useNavigate();
  const [upload, setUpload] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("status") == 0) {
      navigate("/login");
    }
  });
  const captureInput = (e) => {
    const arr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      arr.push(e.target.files[i]);
    }
    setUpload(arr);
  };
  const submitForm = async (e) => {
    e.preventDefault();
    for (let i = 0; i < upload.length; i++) {
      const formData = new FormData();
      formData.append("myFile", upload[i]);
      formData.append("name", "lotTest");

      const config = {
        headers: {
          "Content-Type": "application/json",
          tokenizer: localStorage.getItem("token"),
        },
      };
      try {
        const res = await axios.post(
          `http://localhost:4000/api/documents/fupload`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              tokenizer: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        alert("Sorry Document failed to upload. Please try again");
      }
    }
    alert("Document Successfully UPloaded.");
  };

  return (
    <Fragment>
      <Navbar />
      <section className="container">
        <form className="form" onSubmit={submitForm}>
          <div className="form-group">
            <input
              onChange={captureInput}
              type="file"
              id="files"
              name="files"
              multiple="multiple"
            />
            <small className="form-text">
              Could be Multiple Files Selected at Once.
            </small>
          </div>
          <input
            type="submit"
            value="Submit Document"
            className="btn btn-primary "
          />
          <a className="btn btn-light my-1" href="/dashboard">
            Go Back
          </a>
        </form>
      </section>
    </Fragment>
  );
};

export default Form;
