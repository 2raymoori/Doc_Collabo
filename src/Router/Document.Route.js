const express = require("express");
const Router = express.Router();
const {
  shareDoc,
  addDocuments,
  updateDownloadCount,
  userDocs,
  sharedDocs,
} = require("../Controller/Document.Controller");
const authenticate = require("../MiddleWare/auth");

// All shared Documents Route
Router.get("/docs", authenticate, sharedDocs);

// Enable sharing Documents Route
Router.put("/docs/share/:docId", shareDoc);

// All Documents by Curr User Route
Router.get("/docs/all", authenticate, userDocs);

// Update Download Count per dpcument Id of the document ROUTE
Router.put("/update_count/:docid", updateDownloadCount);

// Uploading doucment Route...
Router.post("/fupload", authenticate, addDocuments);

module.exports = Router;
