import axios from 'axios';
import React,{Fragment, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../Auth/Login';
import Navbar from './Navbar';
import DatatablePage from './Table';



 const Dashboard = (props) => {
     let navigate = useNavigate();
    const [userDocuments,setUserDocuments] =useState([]);

  let count = 0;
  const fetchData = async()=>{


        try {

        const documents = await axios.get(`http://localhost:4000/docs/${localStorage.getItem("uId")}`)
        // console.log(documents.data.data);
        if(documents.data.status === 200){

        setUserDocuments(documents.data.data)
        }
        else{
        setUserDocuments("")
        }
        //  console.log(userDocuments)
        } catch (error) {

        }
  }
  useEffect(function effectFunction() {
      console.log(localStorage.getItem("status"));
    const status = localStorage.getItem("status");

    fetch(`http://localhost:4000/docs/${localStorage.getItem("uId")}`)
        .then(response => response.json())
        .then(({ data: books }) => {
            // console.log(books)
            setUserDocuments(books);
        });
}, [])
/*
()=>{
    if (count ===0) {
        fetchData();
    }
count ++;

  },[]
*/
const downloadCount = async(docId) => {
    try {
        const docToUpdate = await axios.put(`http://localhost:4000/update/${docId}`)
        console.log(docToUpdate);
    } catch (error) {

    }
}
const shareDoc = async(docId) => {
    try {
        const docToUpdate = await axios.put(`http://localhost:4000/doc/${docId}`);
        console.log(docToUpdate)
        alert("Document Successfully Shared for others to view ");
    } catch (error) {

    }
}
if(localStorage.getItem("status")==0){
   navigate("/login")
}
else{

  return (

    <Fragment>

      <Navbar share = "Shared Files"/>
        {

        <section className="container">
    <div className=' btnDocAdd'><Link to={"/upload"}>Upload Document(s)</Link></div>
            {userDocuments.length === 0 ? <h2>Sorry No Document uploaded yet</h2>:
            <section>
                <table className='table table-striped table-'>
                    <tr>
                        <th>Name</th>
                        <th>Upload Date / Time</th>
                        <th>Action </th>
                        <th>Download Count</th>
                        <th>Icon / Type</th>
                    </tr>

                    {userDocuments.map(e=>{
                        return <tr key={e.docId}>
                                <td>{e.name.split("/")[1]}</td>
                                <td>{e.createdAt}</td>
                                <td>
                                    <a className='btn btn-primary' onClick={()=>{downloadCount(e.docId)}} href={`http://localhost:4000/documents/${e.name}`} target="_blank">View / Download</a>
                                    <button onClick={()=>{shareDoc(e.docId)}} className="btn ">Share Doc</button>
                                </td>
                                <td>{e.DownloadCount}</td>
                                <td><div className='fileLogoCont'><img src={require(`../../img/${e.docType}.png`)} className="fileLogo"/></div></td>
                            </tr>
                    })}
                </table>
            </section>}
        </section>
    }

    </Fragment>

  )
}

}

export default Dashboard
