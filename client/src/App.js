import logo from './logo.svg';
import { Fragment, useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes,Switch} from 'react-router-dom'
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Landing from './Component/Layouts/Landing';
import  Navbar  from './Component/Layouts/Navbar';
import './App.css';
import Form from './Component/Form';
import Dashboard from './Component/Layouts/Dashboard';
import SharedFiles from './Component/Layouts/SharedFiles';

function App() {
  useEffect(()=>{
    console.log("APP.JS...")
  })
  return (
      <Router>
    <Fragment>
      <Routes>
        <Route path="/" exact="true" element={<Landing />}/>
      </Routes>
      <section className='containerS'>

       <Routes>
         <Route path="/upload" exact="true" element={<Form />} />
        <Route path="/login" exact="true" element={<Login />}/>
        <Route path="/dashboard" exact="true" element={<Dashboard />} />
        <Route path="/shared" exact="true" element={<SharedFiles />} />
        <Route path="/register" exact="true" element={<Register />}/>
       </Routes>
      </section>
       </Fragment>
    </Router>
  );
}

export default App;
