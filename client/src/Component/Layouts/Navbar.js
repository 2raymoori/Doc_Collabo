import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = (props) => {
  let btn = "";
  if(localStorage.getItem("status") == 0){
    btn =(<> <li><Link to="/register">Register</Link></li><li><Link to="/login">Login</Link></li>  </>)
  }else{
    btn = (<>  <li><Link to="/dashboard">{props.dashboard}</Link></li> <li><Link to="/shared">{props.share}</Link></li> <li><Link to="/login">Logout</Link></li></>)
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> Doc Collabo</Link>
      </h1>
      <ul>

     {btn}


      </ul>
    </nav>
  )
}
export default Navbar

