import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = (props) => {
  let navigate = useNavigate();
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(function effectFunction() {
    const status = localStorage.getItem("status");

    fetch(`http://localhost:4000/api/documents/docs/all`, {
      headers: {
        "Content-Type": "application/json",
        tokenizer: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(({ data: books }) => {
        setUserDocuments(books);
      })
      .catch((err) => {});
  }, []);
  const downloadCount = async (docId) => {
    try {
      const docToUpdate = await axios.put(
        `http://localhost:4000/api/documents/update_count/${docId}`
      );
    } catch (error) {}
  };
  const shareDoc = async (docId) => {
    try {
      const docToUpdate = await axios.put(
        `http://localhost:4000/api/documents/docs/share/${docId}`
      );
      alert("Document Successfully Shared for others to view ");
    } catch (error) {}
  };

  if (localStorage.getItem("status") == 0) {
    navigate("/login");
  } else {
    return (
      <Fragment>
        <Navbar share="Shared Files" />
        {
          <section className="container">
            <div className=" btnDocAdd">
              <Link to={"/upload"}>Upload Document(s)</Link>
            </div>
            {userDocuments.length === 0 ? (
              <h2>Sorry No Document uploaded yet</h2>
            ) : (
              <section>
                <table className="table table-striped table-">
                  <tr>
                    <th>Name</th>
                    <th>Upload Date / Time</th>
                    <th>Action </th>
                    <th>Download Count</th>
                    <th>Icon / Type</th>
                  </tr>

                  {userDocuments.map((e) => {
                    return (
                      <tr key={e._id}>
                        <td>{e.name.split("/")[1]}</td>
                        <td>
                          {e.createdAt.split("T")[0]}{" "}
                          {e.createdAt.split("T")[1].split(".")[0]}
                        </td>
                        <td>
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
                          <button
                            onClick={() => {
                              shareDoc(e._id);
                            }}
                            className="btn "
                          >
                            Share Doc
                          </button>
                        </td>
                        <td>
                          {e.downloadCount}
                          {e.docType}
                        </td>
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

export default Dashboard;
