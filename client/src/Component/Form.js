import axios from 'axios';
import React, { Component,Fragment, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Layouts/Navbar';



 const Form = ()=>{
     let navigate = useNavigate();
    const [upload,setUpload] = useState([]);

    const captureInput = (e)=>{
        const arr = [];
        for(let i = 0; i < e.target.files.length; i++){
            console.log(i)
        arr.push(e.target.files[i]);
        }
        setUpload(arr);
    }
    const submitForm = async(e)=>{

        e.preventDefault();

        console.log(upload)
        for(let i = 0; i<upload.length; i++) {

        const formData = new FormData();
        formData.append("myFile",upload[i]);
        formData.append("name","lotTest")
        try {
            const res = await axios.post(`http://localhost:4000/fuploads/${localStorage.getItem('uEmail')}/${localStorage.getItem("uId")}`,formData);
            console.log(res);
        } catch (error) {
            console.log(error);
            alert("Sorry Document failed to upload. Please try again")
        }
        }
        alert("Document Successfully UPloaded.")
    }

if(localStorage.getItem("status")==0){
    navigate("/login")
 }
 else{
    return(
        <Fragment>

  <Navbar />
  <section className='container'>
            <form className="form" onSubmit={submitForm}>

        <div className="form-group">
          <input onChange={captureInput} type="file" id="files" name="files" multiple="multiple" />
          <small className="form-text"
            >Could be Multiple Files Selected at Once.</small
          >
        </div>
        <input type="submit" value="Submit Document" className="btn btn-primary " />
        <a className="btn btn-light my-1" href="/dashboard">Go Back</a>
        </form>
        </section>
        </Fragment>
    )
    }
}


export default Form;
