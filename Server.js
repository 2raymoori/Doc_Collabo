const express = require("express");
const dbHandle = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 4000;

const app = express();
// initialize and instantiate db instance
dbHandle();
app.use(express.json());
// app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// define server public folder
app.use(express.static(__dirname + "/public"));

app.use("/api/users", require("./src/Router/User.Route"));
app.use("/api/documents", require("./src/Router/Document.Route"));
app.listen(PORT, () => {
  "Server Started on port " + PORT;
});
