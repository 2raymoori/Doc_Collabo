
const express = require('express');
const cors = require('cors');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fileUpload = require('express-fileupload');
const { uuid } = require('uuidv4');

const db = lowdb(new FileSync("db.json"));

db.defaults({documents:[]}).write();
db.defaults({users:[]}).write();

const app = express();
app.use(cors());
app.use(fileUpload({
    createParentPath:true,
}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const PORT = 4000;

app.put("/doc/:id",(req,res)=>{
    const id = req.params.id;
    const dateHandle = new Date();
    let curDoc = db
    .get('documents')
    .find({"docId":id})
    .value();
    curDoc.isShared = true;
    const dateTimeUpload = dateHandle.toLocaleDateString()+" "+dateHandle.toLocaleTimeString();
    curDoc.dateShared = dateTimeUpload;

    db.get('documents')
    .find({"docId":id})
    .write();
    res.status(200).json({status:"success",data:"Document Successfully Shared"});

})

app.get("/docs/shared",(req,res)=>{
    const sharedList = db.get("documents").filter({isShared:true}).value();

    if(sharedList.length > 0){

        return res.status(200).json({"status":"Success","data":sharedList});
    }else{
        return res.status(201).json({"status":"Error","data":[]})
    }
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    if(email && password){
        const curUser = db.get('users').value().filter((e)=>{
            return e.email ===email
       });
       if(curUser.length ==1 && curUser[0].password == password){
           return res.status(200).json({"status":"Success","data":curUser[0]});
       }else{
           return res.status(201).json({"Status":"Error","Message":"Sorry Wrong Credentials provided."})
       }
    }
});
app.get("/docs/:uid", (req,res) => {
    const documents = db.get("documents").value().filter(doc => doc.userId == req.params.uid)
    if(documents.length > 0){
        return res.status(200).json({"status":"Success","data":documents});
    }else{
        return res.status(201).json({"status":"Error","data":[]})
    }
})

app.put("/update/:docid",(req,res)=>{
        // Get Current Document
    let curDoc = db
    .get('documents')
    .find({"docId":req.params.docid})
    .value();

    // update DownloadCount
   curDoc.DownloadCount = curDoc.DownloadCount+1;

    // Document to updated

    db.get('documents')
    .find({"docId":req.params.docid})
    .write();
    res.status(200).json({status:"success",data:"Document Successfully Updated"});
});

app.post("/signup",(req,res)=>{
    const {email,password,passwordConfirm,name} = req.body;
    if(email && password && passwordConfirm && name){
        if(password !== passwordConfirm){
            return res.status(201).json({"status":"Error", "message":"Make sure your password confirm Password are the same"})
        }
        let flag = false;
        const users = db.get("users").value();
        users.forEach((user)=>{
            if(user.email === email){
                flag = true;
                return true;
            }
        });
        if(flag){
            return res.status(201).json({"status":"Error", "message":"Sorry There exists a user in the System with this email address. Try a different one"})
        }else{
            const uToSave = {...req.body,id:uuid()};
            db.get('users').push(uToSave).write();
            return res.status(200).json({"status":"Success", "data":uToSave});
        }

    }
    else{
        return res.status(201).json({"status":"Error", "message":"Sorry All Fields are required"})
    }

})


app.post("/fuploads/:email/:uId",(req,res)=>{
    const {email,uId} = req.params;
    // console.log(req.files);

    if(req.files){
        const docs = req.files.myFile;
        // console.log(docs)
        const dateHandle = new Date();
        let docType_extension = "";
        const dateTimeUpload = dateHandle.toLocaleDateString()+" "+dateHandle.toLocaleTimeString();
        if(Array.isArray(docs)){

        }else{
            docs.mv(`./public/documents/${email}/${docs.name}`);
            docType_extension = docs.name.split(".")[docs.name.split(".").length - 1];
            db.get("documents").push({
                name:`${email}/${docs.name}`,
                createdAt:dateTimeUpload,
                docType:docType_extension,
                DownloadCount:0,
                userId:uId,
                docId:uuid(),
                isShared:false,
                dateShared:"00:00:00 23/09/2022",
                userEmail:email
            }).write();
        }

    }
    return res.status(200).json({"status":"OK",message:"Files Successfully Uploaded"})
})


app.listen(PORT,()=>{
    console.log("Server Started on port " +PORT)
});

