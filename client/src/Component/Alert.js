import React from 'react'

 const Alert =(props)=> {
     return(
        <div className={`alert alert-${props.alertType}`}>
            {props.msg}
        </div>
     )
 }
export default Alert;


