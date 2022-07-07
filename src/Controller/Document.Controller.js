const DocumentModel = require("../Model/Document.model");

// Shared List Docoument Route
const sharedDocs = async (req, res) => {
  const sharedDocuments = await DocumentModel.find({ isShared: true });
  sharedDocuments;
  if (sharedDocuments.length > 0) {
    return res.status(200).json({ status: "Success", data: sharedDocuments });
  } else {
    return res.status(201).json({ status: "Error", data: [] });
  }
};

//Sharing Documents to the public Route
const shareDoc = async (req, res) => {
  try {
    const docToUpdate = await DocumentModel.findById(req.params.docId);
    if (docToUpdate) {
      docToUpdate.isShared = true;
      docToUpdate.dateShared = new Date();
      await docToUpdate.save();
      return res
        .status(200)
        .json({ status: "succes", data: { msg: "Doc successfully Shared" } });
    } else {
      return res.status(201).json({
        status: "Error",
        data: { msg: "Sorry No such Document with this id" },
      });
    }
  } catch (error) {
    error;
    return res.status(500).json({ status: "Error", data: { msg: "Error" } });
  }
};

// All Documents by User Id
const userDocs = async (req, res) => {
  req.user;
  const docList = await DocumentModel.find({ userId: req.user.uId });
  docList;
  // const documents = db.get("documents").value().filter(doc => doc.userId == req.params.uid)
  if (docList.length > 0) {
    return res.status(200).json({ status: "Success", data: docList });
  } else {
    return res.status(201).json({ status: "Error", data: [] });
  }
};

// Update Download Count per dpcument Id of the document ROUTE
const updateDownloadCount = async (req, res) => {
  // Get Current Document
  try {
    const docId = req.params.docid;
    const docToUpdate = await DocumentModel.findById(docId);
    if (docToUpdate) {
      docToUpdate;
      docToUpdate.downloadCount = docToUpdate.downloadCount + 1;
      await docToUpdate.save();
      return res.status(200).json({
        status: "succes",
        data: { msg: "Doc Count successfully updated" },
      });
    } else {
      return res.status(201).json({
        status: "Error",
        data: { msg: "Sorry No such Document with this id" },
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "Error", data: { msg: "Error" } });
  }
};

// Uploading doucment Route...
const addDocuments = async (req, res) => {
  const { email, uId } = req.user;

  if (req.files) {
    const docs = req.files.myFile;
    const dateHandle = new Date();
    let docType_extension = "";
    const dateTimeUpload =
      dateHandle.toLocaleDateString() + " " + dateHandle.toLocaleTimeString();
    if (Array.isArray(docs)) {
    } else {
      docs.mv(`./public/documents/${email}/${docs.name}`);
      docType_extension = docs.name.split(".")[docs.name.split(".").length - 1];
      const newDoc = new DocumentModel();
      newDoc.docType = docType_extension.toLowerCase();
      newDoc.createdAt = dateTimeUpload;
      newDoc.name = `${email}/${docs.name}`;
      newDoc.downloadCount = 0;
      newDoc.userId = uId;
      newDoc.email = email;
      await newDoc.save();
    }
  }
  return res
    .status(200)
    .json({ status: "OK", message: "Files Successfully Uploaded" });
};

module.exports = {
  shareDoc,
  addDocuments,
  updateDownloadCount,
  userDocs,
  sharedDocs,
};
