import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SharedFiles = (props) => {
  let navigate = useNavigate();
  const [sharedDocuments, setSharedDocuments] = useState([]);

  useEffect(function effectFunction() {
    fetch(`http://localhost:4000/api/documents/docs`, {
      headers: {
        "Content-Type": "application/json",
        tokenizer: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(({ data: books }) => {
        setSharedDocuments(books);
      });
  }, []);
  const downloadCount = async (docId) => {
    try {
      const docToUpdate = await axios.put(
        `http://localhost:4000/api/documents/update_count/${docId}`
      );
    } catch (error) {}
  };
  if (localStorage.getItem("status") == 0) {
    navigate("/login");
  } else {
    return (
      <Fragment>
        <Navbar dashboard="My Files" />
        {
          <section className="container">
            <div className=" btnDocAdd">
              <Link to={"/upload"}>Upload Document(s)</Link>
            </div>
            {sharedDocuments.length === 0 ? (
              <h2>Sorry No Document uploaded yet</h2>
            ) : (
              <section>
                <table className="table table-striped table-">
                  <tr>
                    <th>Name</th>
                    <th>Upload Date / Time</th>
                    <th>View </th>
                    <th>Owner / Creator</th>
                    <th>Icon / Type</th>
                  </tr>

                  {sharedDocuments.map((e) => {
                    return (
                      <tr key={e._id}>
                        <td>{e.name.split("/")[1]}</td>
                        <td>
                          {e.createdAt.split("T")[0]}{" "}
                          {e.createdAt.split("T")[1].split(".")[0]}
                        </td>
                        <td>
                          {" "}
                          <a
                            className="btn btn-primary"
                            onClick={() => {
                              downloadCount(e._id);
                            }}
                            href={`http://localhost:4000/documents/${e.name}`}
                            target="_blank"
                          >
                            View / Download
                          </a>
                        </td>
                        <td>{e.email}</td>
                        <td>
                          <div className="fileLogoCont">
                            <img
                              src={require(`../../img/${e.docType}.png`)}
                              className="fileLogo"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </section>
            )}
          </section>
        }
      </Fragment>
    );
  }
};

export default SharedFiles;
